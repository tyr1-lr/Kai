from note.models import Note


def find_note(user, data):

    if data.get("id"):
        return Note.objects.filter(
            id=data["id"],
            author=user
        ).first()

    if not data.get("title"):
        return None

    return Note.objects.filter(
        author=user,
        title__icontains=data["title"]
    ).first()


def create_note(user, data):
    note = Note.objects.create(
        author=user,
        title=data["title"],
        content=data.get("content", "")
    )

    return {
        "success": True,
        "action": "create_note",
        "message": "Note created successfully.",
        "note_id": note.id
    }


def update_note(user, data):
    note = find_note(user, data)

    if not note:
        return {
            "success": False,
            "action": "update_note",
            "message": "Note not found."
        }

    note.title = data.get("title", note.title)
    note.content = data.get("content", note.content)

    note.save()

    return {
        "success": True,
        "action": "update_note",
        "message": "Note updated successfully.",
        "note_id": note.id
    }


def delete_note(user, data):
    note = find_note(user, data)

    if not note:
        return {
            "success": False,
            "action": "delete_note",
            "message": "Note not found."
        }

    note.delete()

    return {
        "success": True,
        "action": "delete_note",
        "message": "Note deleted successfully.",
    }
