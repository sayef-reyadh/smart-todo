import boto3
from boto3.dynamodb.conditions import Key
from typing import Any, Dict, List, Optional
from ..model.task import Task
from .interfaces import TaskRepositoryInterface


def _serialize_item(data: Dict[str, Any]) -> Dict[str, Any]:
    """Convert Python types unsupported by DynamoDB (datetime -> ISO string, drop None)."""
    result = {}
    for k, v in data.items():
        if v is None:
            continue  # DynamoDB does not allow None in put_item items
        elif hasattr(v, "isoformat"):
            result[k] = v.isoformat()
        else:
            result[k] = v
    return result


def _build_resource(region: str):
    # boto3 credential chain: AWS_ACCESS_KEY_ID/AWS_SECRET_ACCESS_KEY env vars, or IAM role
    return boto3.resource("dynamodb", region_name=region)


def _get_table(region: str, table_name: str):
    return _build_resource(region).Table(table_name)


class DynamoDBTaskRepository(TaskRepositoryInterface):
    def __init__(self, region: str, table_name: str):
        self.table = _get_table(region, table_name)

    def list_by_user(self, user_id: str) -> List[Task]:
        response = self.table.query(
            IndexName="user_id-index",
            KeyConditionExpression=Key("user_id").eq(user_id),
        )
        return [Task(**item) for item in response.get("Items", [])]

    def get(self, task_id: str) -> Optional[Task]:
        response = self.table.get_item(Key={"id": task_id})
        item = response.get("Item")
        return Task(**item) if item else None

    def create(self, task: Task) -> Task:
        self.table.put_item(Item=_serialize_item(task.dict()))
        return task

    def update(self, task_id: str, patch: dict) -> Optional[Task]:
        if not patch:
            return self.get(task_id)

        serialized = _serialize_item(patch)
        update_expr = "SET " + ", ".join(f"#f{i} = :v{i}" for i in range(len(serialized)))
        expr_names = {f"#f{i}": k for i, k in enumerate(serialized)}
        expr_values = {f":v{i}": v for i, v in enumerate(serialized.values())}

        try:
            response = self.table.update_item(
                Key={"id": task_id},
                UpdateExpression=update_expr,
                ExpressionAttributeNames=expr_names,
                ExpressionAttributeValues=expr_values,
                ConditionExpression="attribute_exists(id)",
                ReturnValues="ALL_NEW",
            )
            return Task(**response["Attributes"])
        except self.table.meta.client.exceptions.ConditionalCheckFailedException:
            return None

    def delete(self, task_id: str) -> bool:
        try:
            self.table.delete_item(
                Key={"id": task_id},
                ConditionExpression="attribute_exists(id)",
            )
            return True
        except self.table.meta.client.exceptions.ConditionalCheckFailedException:
            return False
