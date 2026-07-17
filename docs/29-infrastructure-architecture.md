# Infrastructure Architecture

## Overview

Smart Todo is split into two independently deployed layers:

| Layer | Platform | URL |
|-------|----------|-----|
| Frontend (React + Vite) | Vercel | `https://smart-todo-ruby.vercel.app` |
| Backend (FastAPI + Mangum) | AWS Lambda + API Gateway | `https://55t0c7lyce.execute-api.us-east-2.amazonaws.com` |
| Database | AWS DynamoDB | `us-east-2` |

---

## Architecture Diagram

```mermaid
flowchart TD
    Browser["🌐 Browser\nReact SPA\nAuthContext + axios interceptor"]

    subgraph Vercel["Vercel"]
        SPA["React + Vite\nstatic build\nVITE_API_BASE_URL baked in"]
    end

    subgraph AWS["AWS · us-east-2"]
        APIGW["API Gateway HTTP API v2\nsmart-todo-api\nCORS · $default route"]

        subgraph Lambda["Lambda · smart-todo-api\nPython 3.11 · 256 MB · 30s"]
            Mangum["Mangum\nASGI → Lambda adapter"]
            FastAPI["FastAPI\nPOST /api/auth/signup\nPOST /api/auth/login\nGET · POST · PUT · DELETE /api/tasks"]
            Mangum --> FastAPI
        end

        TASKS[("DynamoDB\nTASKS\nPK: id\nGSI: user_id-index")]
        USERS[("DynamoDB\nUSERS\nPK: email")]
        IAM["IAM Role\nread/write only"]
    end

    Browser -->|"HTTPS · Authorization: Bearer JWT"| APIGW
    Browser -->|"serves static files"| SPA
    APIGW -->|"Lambda proxy integration"| Mangum
    FastAPI -->|via IAM Role| IAM
    IAM --> TASKS
    IAM --> USERS
```

---

## Request Flow

### Auth (Signup / Login)

```mermaid
sequenceDiagram
    actor User as Browser
    participant GW as API Gateway
    participant Fn as Lambda / FastAPI
    participant DB as DynamoDB USERS

    User->>GW: POST /api/auth/signup {name, email, password}
    GW->>Fn: proxy
    Fn->>Fn: bcrypt(password + pepper)
    Fn->>DB: PutItem {email, hashed_password, id, ...}
    Fn-->>GW: 201 {access_token, user_id, email, name}
    GW-->>User: 201

    User->>GW: POST /api/auth/login {email, password}
    GW->>Fn: proxy
    Fn->>DB: GetItem {email}
    Fn->>Fn: verify pepper + bcrypt → create JWT (HS256, 24h)
    Fn-->>GW: 200 {access_token, user_id, email, name}
    GW-->>User: 200
```

### Authenticated Task Request

```mermaid
sequenceDiagram
    actor User as Browser
    participant GW as API Gateway
    participant Fn as Lambda / FastAPI
    participant DB as DynamoDB TASKS

    User->>GW: GET /api/tasks\nAuthorization: Bearer JWT
    GW->>Fn: proxy
    Fn->>Fn: decode JWT → extract user_id
    Fn->>DB: Query GSI user_id-index WHERE user_id = ?
    DB-->>Fn: [{id, title, priority, completed, ...}]
    Fn-->>GW: 200 [tasks]
    GW-->>User: 200 [tasks]
```

---

## Security Model

| Concern | Solution |
|---------|----------|
| Password storage | bcrypt (auto-salt) + server-side pepper |
| API authentication | JWT (HS256, 24h expiry) in `Authorization` header |
| Secrets at rest | GitHub Actions secrets → Lambda env vars (never in code) |
| DynamoDB access | Lambda IAM role — least privilege read/write only |
| Cross-origin requests | CORS configured on API Gateway (allow `*` for dev) |

---

## Infrastructure as Code (CDK)

All AWS resources are defined in [`infra/stacks/smart_todo_stack.py`](../infra/stacks/smart_todo_stack.py) and provisioned via AWS CDK v2.

| Resource | CDK Construct | Config |
|----------|---------------|--------|
| TASKS table | `dynamodb.Table` | PAY_PER_REQUEST, DESTROY |
| USERS table | `dynamodb.Table` | PAY_PER_REQUEST, DESTROY |
| Lambda | `lambda_.Function` | Python 3.11, 256 MB, 30s |
| Lambda bundling | `BundlingOptions` | Docker: `sam/build-python3.11` image |
| API Gateway | `apigwv2.HttpApi` | HTTP API v2, $default route |
| IAM | auto-generated | `grant_read_write_data()` |

---

## CI/CD Pipelines

```mermaid
flowchart TD
    push["git push → main"]

    push --> BE_trigger{"paths:\nbackend/**\ninfra/**"}
    push --> FE_trigger{"paths:\nfrontend/**"}

    subgraph backend_wf["deploy-backend.yml"]
        B1["Python 3.11\nInstall CDK CLI"]
        B2["pip install\ninfra/requirements.txt"]
        B3["Configure AWS credentials\nfrom secrets"]
        B4["cdk deploy SmartTodoStack\n--require-approval never"]
        B5["Print API URL\nto job summary"]
        B1 --> B2 --> B3 --> B4 --> B5
    end

    subgraph frontend_wf["deploy-frontend.yml"]
        F1["Node 20"]
        F2["vercel pull\n(fetch project config)"]
        F3["vercel build --prod\nVITE_API_BASE_URL injected"]
        F4["vercel deploy --prebuilt --prod"]
        F1 --> F2 --> F3 --> F4
    end

    BE_trigger -->|yes| backend_wf
    FE_trigger -->|yes| frontend_wf
```

### Secret injection flow

```mermaid
flowchart LR
    subgraph GH["GitHub Actions Secrets"]
        S1["AWS_ACCESS_KEY_ID\nAWS_SECRET_ACCESS_KEY"]
        S2["JWT_SECRET_KEY\nPASSWORD_PEPPER"]
        S3["VERCEL_TOKEN\nVERCEL_ORG_ID\nVERCEL_PROJECT_ID"]
        S4["VITE_API_BASE_URL"]
    end

    S1 -->|"configure-aws-credentials"| AWS_CREDS["AWS SDK / CDK"]
    S2 -->|"CDK env vars"| LAMBDA_ENV["Lambda\nenv vars"]
    LAMBDA_ENV -->|"pydantic-settings"| FASTAPI["FastAPI Settings"]
    S3 -->|"Vercel CLI flags"| VERCEL["Vercel deploy"]
    S4 -->|"Vite build-time"| BUNDLE["JS bundle\n(baked in at build)"]
```

---

## AWS Resources Summary

| Resource | Name | Region |
|----------|------|--------|
| CloudFormation Stack | `SmartTodoStack` | us-east-2 |
| Lambda Function | `smart-todo-api` | us-east-2 |
| API Gateway | `smart-todo-api` | us-east-2 |
| DynamoDB Table | `TASKS` | us-east-2 |
| DynamoDB Table | `USERS` | us-east-2 |
| CDK Bootstrap Stack | `CDKToolkit` | us-east-2 |
| S3 Staging Bucket | `cdk-hnb659fds-assets-*` | us-east-2 |
