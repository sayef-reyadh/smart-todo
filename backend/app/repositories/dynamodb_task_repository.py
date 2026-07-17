import boto3
from boto3.dynamodb.conditions import Key
from typing import Any, Dict, List, Optional
from ..models.task import Task


def _serialize(data: Dict[str, Any]) -> Dict[str, Any]:
    result = {}
    for k, v in data.items():
        if v is None:
            continue
        elif hasattr(v, "isoformat"):
            result[k] = v.isoformat()
        else:
            result[k] = v
    return result


def _get_table(region: str, table_name: str):
    return boto3.resource("dynamodb", region_name=region).Table(table_name)


class DynamoDBTaskRepository:
    """
    TASKS DynamoDB table:
      PK  = id       (String)
      GSI = user_id-index  (PK: user_id)
    """

    def __init__(self, region: str, table_name: str):
        self.table = _get_table(region, table_name)

    def list_by_user(self, user_id: str) -> List[Task]:
        response = self.table.query(
            IndexName="user_id-index",
            KeyConditionExpression=Key("user_id").eq(user_id),
        )
        return [Task(**i) for i in response.get("Items", [])]

    def get(self, task_id: str) -> Optional[Task]:
        item = self.table.get_item(Key={"id": task_id}).get("Item")
        return Task(**item) if item else None

    def create(self, task: Task) -> Task:
        self.table.put_item(Item=_serialize(task.dict()))
        return task

    def update(self, task_id: str, patch: dict) -> Optional[Task]:
        if not patch:
            return self.get(task_id)
        serialized = _serialize(patch)
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
