"""
SmartTodoStack — provisions:
  - DynamoDB: TASKS table (PK=id, GSI=user_id-index)
  - DynamoDB: USERS table (PK=email)
  - Lambda:   FastAPI app via Mangum (handler.handler)
  - HTTP API: API Gateway v2 → Lambda
  - IAM:      Lambda execution role with DynamoDB read/write

Secret injection flow:
  GitHub Actions secrets
      → CDK deploy env vars (os.environ)
          → Lambda environment variables
              → FastAPI Settings (pydantic-settings)

GitHub Actions secrets required:
  AWS_ACCESS_KEY_ID       — AWS IAM credentials for CDK deploy
  AWS_SECRET_ACCESS_KEY   — AWS IAM credentials for CDK deploy
  JWT_SECRET_KEY          — JWT signing secret
  PASSWORD_PEPPER         — password hashing pepper
"""

import os
from aws_cdk import (
    Stack,
    Duration,
    RemovalPolicy,
    CfnOutput,
    BundlingOptions,
    aws_dynamodb as dynamodb,
    aws_lambda as lambda_,
    aws_apigatewayv2 as apigwv2,
    aws_apigatewayv2_integrations as integrations,
)
from constructs import Construct


class SmartTodoStack(Stack):
    def __init__(self, scope: Construct, construct_id: str, **kwargs):
        super().__init__(scope, construct_id, **kwargs)

        # ── DynamoDB: TASKS ───────────────────────────────────────────────────
        tasks_table = dynamodb.Table(
            self, "TasksTable",
            table_name="TASKS",
            partition_key=dynamodb.Attribute(name="id", type=dynamodb.AttributeType.STRING),
            billing_mode=dynamodb.BillingMode.PAY_PER_REQUEST,
            removal_policy=RemovalPolicy.DESTROY,
        )
        tasks_table.add_global_secondary_index(
            index_name="user_id-index",
            partition_key=dynamodb.Attribute(name="user_id", type=dynamodb.AttributeType.STRING),
            projection_type=dynamodb.ProjectionType.ALL,
        )

        # ── DynamoDB: USERS ───────────────────────────────────────────────────
        users_table = dynamodb.Table(
            self, "UsersTable",
            table_name="USERS",
            partition_key=dynamodb.Attribute(name="email", type=dynamodb.AttributeType.STRING),
            billing_mode=dynamodb.BillingMode.PAY_PER_REQUEST,
            removal_policy=RemovalPolicy.DESTROY,
        )

        # ── Secrets: read from environment (injected by GitHub Actions) ───────
        # These are NEVER hardcoded — GitHub Actions passes them at deploy time
        jwt_secret_key  = os.environ["JWT_SECRET_KEY"]
        password_pepper = os.environ["PASSWORD_PEPPER"]

        # ── Lambda: FastAPI + Mangum ──────────────────────────────────────────
        api_fn = lambda_.Function(
            self, "SmartTodoApiFunction",
            function_name="smart-todo-api",
            runtime=lambda_.Runtime.PYTHON_3_11,
            handler="handler.handler",
            code=lambda_.Code.from_asset(
                "../backend",
                bundling=BundlingOptions(
                    image=lambda_.Runtime.PYTHON_3_11.bundling_image,
                    command=[
                        "bash", "-c",
                        "pip install -r requirements.txt -t /asset-output --quiet "
                        "&& cp -r . /asset-output",
                    ],
                ),
            ),
            timeout=Duration.seconds(30),
            memory_size=256,
            environment={
                # ── Table names: set by CDK (not secrets) ────────────────────
                "DYNAMODB_TABLE_NAME":       tasks_table.table_name,
                "DYNAMODB_USERS_TABLE_NAME": users_table.table_name,
                "AWS_REGION":                self.region,
                # ── Secrets: from GitHub Actions → CDK env → Lambda ───────────
                "JWT_SECRET_KEY":            jwt_secret_key,
                "PASSWORD_PEPPER":           password_pepper,
                "JWT_ALGORITHM":             "HS256",
                "JWT_EXPIRE_MINUTES":        "1440",
            },
        )

        tasks_table.grant_read_write_data(api_fn)
        users_table.grant_read_write_data(api_fn)

        # ── HTTP API Gateway v2 ───────────────────────────────────────────────
        http_api = apigwv2.HttpApi(
            self, "SmartTodoHttpApi",
            api_name="smart-todo-api",
            cors_preflight=apigwv2.CorsPreflightOptions(
                allow_origins=["*"],
                allow_methods=[apigwv2.CorsHttpMethod.ANY],
                allow_headers=["*"],
            ),
            default_integration=integrations.HttpLambdaIntegration(
                "ApiIntegration", api_fn
            ),
        )

        CfnOutput(
            self, "ApiUrl",
            value=http_api.api_endpoint,
            description="Backend API base URL — use as VITE_API_BASE_URL in Vercel",
        )

