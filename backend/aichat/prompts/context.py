
def get_relevant_tasks(user, user_message):
    tasks = user.tasks.all()

    relevant_tasks = []

    keywords = user_message.lower().split()

    for task in tasks:
        search_text = (
            f"{task.title} {task.description}"
        ).lower()

        if any(keyword in search_text for keyword in keywords):
            relevant_tasks.append(task)

    return relevant_tasks


def get_task_context(tasks):
    if not tasks.exists():
        return "Current Tasks:\nNo active tasks.\n"

    task_context = "Current Tasks:\n\n"

    for task in tasks:
        completed = "Yes" if task.is_completed else "No"

        task_context += (
            f"- {task.title}\n"
            f"  Description: {task.description or 'No description'}\n"
            f"  Priority: {task.priority}\n"
            f"  Due Date: {task.due_date or 'No due date'}\n"
            f"  Completed: {completed}\n\n"
        )

    return task_context


def get_relevant_notes(user, user_message):
    notes = user.notes.all()

    relevant_notes = []

    keywords = user_message.lower().split()

    for note in notes:
        search_text = (
            f"{note.title} {note.description}"
        ).lower()

        if any(keyword in search_text for keyword in keywords):
            relevant_notes.append(note)

    return relevant_notes


def get_note_context(notes):

    if not notes.exists():
        return "Current Notes:\nNo notes at this time.\n"

    note_context = "Current Notes:\n"

    for note in notes:
        note_context += (
            f"- {note.title}\n"
            f"  Content: {note.content}\n"
        )

    return note_context


def get_goal_context():
    return ""
