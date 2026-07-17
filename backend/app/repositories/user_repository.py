import boto3
from typing import Optional
from ..models.user import User


def _get_table(region: str, table_name: str):
    return boto3.resource("dynamodb", region_name=region).Table(table_name)


class UserRepository:
    """
    USERS DynamoDB table:
      PK = email  (String)   — unique user identifier for lookups
      Attributes: id, name, hashed_password, created_at
    """

    def __init__(self, region: str, table_name: str):
        self.table = _get_table(region, table_name)

    def get_by_email(self, email: str) -> Optional[User]:
        response = self.table.get_item(Key={"email": email})
        item = response.get("Item")
        return User(**item) if item else None

    def create(self, user: User) -> User:
        self.table.put_item(Item=user.dict())
        return user
