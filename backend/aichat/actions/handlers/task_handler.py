from task.models import Task


def create_task(user, data):
    title = data["title"]

    Task.objects.create(
        author=user,
        title=data["title"]
    )

    return {
        "success": True,
        "action": "create_task",
        "message": "Task created successfully."
    }
