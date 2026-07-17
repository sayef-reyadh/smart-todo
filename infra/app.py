#!/usr/bin/env python3
import aws_cdk as cdk
from stacks.smart_todo_stack import SmartTodoStack

app = cdk.App()

SmartTodoStack(
    app,
    "SmartTodoStack",
    env=cdk.Environment(region="us-east-2"),
)

app.synth()
