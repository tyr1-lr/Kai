from calendarapp.models import Reminder


def find_reminder(user, data):

    if data.get("id"):
        return Reminder.objects.filter(
            id=data["id"],
            author=user
        ).first()

    if not data.get("title"):
        return None

    return Reminder.objects.filter(
        author=user,
        title__icontains=data["title"]
    ).first()


def create_reminder(user, data):
    reminder = Reminder.objects.create(
        author=user,
        title=data["title"],
        description=data.get("description", ""),
        date=data.get("date"),
        time=data.get("time"),
        repeat=data.get("repeat", "NEVER"),
    )

    return {
        "success": True,
        "action": "create_reminder",
        "message": "Reminder created successfully.",
        "reminder_id": reminder.id
    }


def update_reminder(user, data):
    reminder = find_reminder(user, data)

    if not reminder:
        return {
            "success": False,
            "action": "update_reminder",
            "message": "Reminder not found."
        }

    reminder.title = data.get("title", reminder.title)
    reminder.description = data.get("description", reminder.description)
    reminder.date = data.get("date", reminder.date)
    reminder.time = data.get("time", reminder.time)
    reminder.repeat = data.get("repeat", reminder.repeat)

    reminder.is_sent = False

    reminder.save()

    return {
        "success": True,
        "action": "update_reminder",
        "message": "Reminder updated successfully.",
        "reminder_id": reminder.id
    }


def delete_reminder(user, data):
    reminder = find_reminder(user, data)

    if not reminder:
        return {
            "success": False,
            "action": "delete_reminder",
            "message": "Reminder not found."
        }

    reminder.delete()

    return {
        "success": True,
        "action": "delete_reminder",
        "message": "Reminder deleted successfully."
    }
