from .handlers.task_handler import create_task


ACTION_HANDLERS = {
    "create_task": create_task,
}


def execute_action(user, parsed):
    intent = parsed["intent"]
    data = parsed["data"]

    handler = ACTION_HANDLERS.get(intent)

    if handler is None:
        return {
            "success": False,
            "message": "No handler found."
        }

    return handler(user, data)
