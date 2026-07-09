from calendarapp.models import Event


def find_event(user, data):
    if data.get("id"):
        return Event.objects.filter(
            id=data["id"],
            author=user
        ).first()

    if not data.get("title"):
        return None

    return Event.objects.filter(
        author=user,
        title__icontains=data["title"]
    ).first()


def create_event(user, data):
    event = Event.objects.create(
        author=user,
        title=data["title"],
        date=data.get("date"),
        start_time=data.get("start_time"),
        end_time=data.get("end_time"),
        description=data.get("description", ""),
        is_reminder=data.get("is_reminder", False),
        reminder_time=data.get("reminder_time"),
    )

    return {
        "success": True,
        "action": "create_event",
        "message": "Event created successfully.",
        "event_id": event.id
    }


def update_event(user, data):
    event = find_event(user, data)

    if not event:
        return {
            "success": False,
            "action": "update_event",
            "message": "Event not found."
        }

    event.title = data.get("title", event.title)
    event.date = data.get("date", event.date)
    event.start_time = data.get("start_time", event.start_time)
    event.end_time = data.get("end_time", event.end_time)
    event.description = data.get("description", event.description)
    event.is_reminder = data.get("is_reminder", event.is_reminder)
    event.reminder_time = data.get("reminder_time", event.reminder_time)

    event.save()

    return {
        "success": True,
        "action": "update_event",
        "message": "Event updated successfully.",
        "event_id": event.id
    }


def delete_event(user, data):
    event = find_event(user, data)

    if not event:
        return {
            "success": False,
            "action": "delete_event",
            "message": "Event not found."
        }

    event.delete()

    return {
        "success": True,
        "action": "delete_event",
        "message": "Event deleted successfully."
    }
