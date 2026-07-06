from task.models import Task


def find_task(user, data):

    if data.get("id"):
        return Task.objects.filter(
            id=data["id"],
            author=user
        ).first()

    if not data.get("title"):
        return None

    return Task.objects.filter(
        author=user,
        title__icontains=data["title"]
    ).first()


def create_task(user, data):
    task = Task.objects.create(
        author=user,
        title=data["title"],
        description=data.get("description", ""),
        priority=data.get("priority", "MEDIUM"),
        due_date=data.get("due_date"),
    )

    return {
        "success": True,
        "action": "create_task",
        "message": "Task created successfully.",
        "task_id": task.id
    }


def update_task(user, data):
    task = find_task(user, data)

    if not task:
        return {
            "success": False,
            "action": "update_task",
            "message": "Task not found."
        }

    task.title = data.get("title", task.title)
    task.description = data.get("description", task.description)
    task.priority = data.get("priority", task.priority)
    task.due_date = data.get("due_date", task.due_date)

    task.save()

    return {
        "success": True,
        "action": "update_task",
        "message": "Task updated successfully.",
        "task_id": task.id
    }


def delete_task(user, data):
    task = find_task(user, data)

    if not task:
        return {
            "success": False,
            "action": "delete_task",
            "message": "Task not found."
        }

    task.delete()

    return {
        "success": True,
        "action": "delete_task",
        "message": "Task deleted successfully."
    }


def complete_task(user, data):
    task = find_task(user, data)

    if not task:
        return {
            "success": False,
            "action": "complete_task",
            "message": "Task not found."
        }

    task.is_completed = True
    task.save()

    return {
        "success": True,
        "action": "complete_task",
        "message": "Task marked as completed.",
        "task_id": task.id
    }


def uncomplete_task(user, data):
    task = find_task(user, data)

    if not task:
        return {
            "success": False,
            "action": "uncomplete_task",
            "message": "Task not found."
        }

    task.is_completed = False
    task.save()

    return {
        "success": True,
        "action": "uncomplete_task",
        "message": "Task marked as uncompleted.",
        "task_id": task.id
    }
