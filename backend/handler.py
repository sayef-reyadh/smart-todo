"""
AWS Lambda entry point.

Mangum wraps the FastAPI ASGI app so API Gateway events are translated to
ASGI requests and responses. The entire FastAPI app runs as a single Lambda
function — no separate Lambda per route needed.

CDK sets LAMBDA_TASK_ROOT and invokes:  handler.handler
"""
from mangum import Mangum
from app.main import app

handler = Mangum(app, lifespan="off")
