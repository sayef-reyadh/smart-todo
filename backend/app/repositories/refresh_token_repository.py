import boto3
from boto3.dynamodb.conditions import Key
from ..models.refresh_token import RefreshToken
from ..core.config import settings


class RefreshTokenRepository:
    def __init__(self):
        self._db = boto3.resource("dynamodb", region_name=settings.AWS_REGION)
        self._table = self._db.Table(settings.DYNAMODB_REFRESH_TOKENS_TABLE_NAME)

    def create(self, token: RefreshToken) -> RefreshToken:
        self._table.put_item(Item=token.model_dump())
        return token

    def get(self, token_id: str) -> RefreshToken | None:
        resp = self._table.get_item(Key={"id": token_id})
        item = resp.get("Item")
        return RefreshToken(**item) if item else None

    def revoke(self, token_id: str) -> None:
        self._table.update_item(
            Key={"id": token_id},
            UpdateExpression="SET revoked = :r",
            ExpressionAttributeValues={":r": True},
        )

    def revoke_all_for_user(self, user_id: str) -> None:
        """Called on password change or 'sign out all devices'."""
        resp = self._table.query(
            IndexName="user_id-index",
            KeyConditionExpression=Key("user_id").eq(user_id),
        )
        for item in resp.get("Items", []):
            self.revoke(item["id"])

