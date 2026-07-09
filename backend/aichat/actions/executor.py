from .handlers.task_handler import (
    create_task,
    update_task,
    delete_task,
    complete_task,
    uncomplete_task,
)

from .handlers.note_handler import (
    create_note,
    update_note,
    delete_note,
)

from .handlers.goal_handler import (
    create_goal,
    update_goal,
    delete_goal,
    create_milestone,
    update_milestone,
    delete_milestone,
    complete_milestone,
    uncomplete_milestone,
)

from .handlers.event_handler import (
    create_event,
    update_event,
    delete_event,
)

from .handlers.reminder_handler import (
    create_reminder,
    update_reminder,
    delete_reminder,
)


ACTION_HANDLERS = {
    "create_task": create_task,
    "update_task": update_task,
    "delete_task": delete_task,
    "complete_task": complete_task,
    "uncomplete_task": uncomplete_task,

    "create_note": create_note,
    "update_note": update_note,
    "delete_note": delete_note,

    "create_goal": create_goal,
    "update_goal": update_goal,
    "delete_goal": delete_goal,

    "create_milestone": create_milestone,
    "update_milestone": update_milestone,
    "delete_milestone": delete_milestone,
    "complete_milestone": complete_milestone,
    "uncomplete_milestone": uncomplete_milestone,

    "create_event": create_event,
    "update_event": update_event,
    "delete_event": delete_event,

    "create_reminder": create_reminder,
    "update_reminder": update_reminder,
    "delete_reminder": delete_reminder,
}


def execute_action(user, parsed):
    intent = parsed.get("intent")
    data = parsed.get("data", {})

    handler = ACTION_HANDLERS.get(intent)

    if handler is None:
        return {
            "success": False,
            "message": "No handler found."
        }

    return handler(user, data)
