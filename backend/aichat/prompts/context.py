
# Tasks
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


# Notes
def get_relevant_notes(user, user_message):
    notes = user.notes.all()

    relevant_notes = []

    keywords = user_message.lower().split()

    for note in notes:
        search_text = (
            f"{note.title} {note.content}"
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
            f"  Content: {note.content}\n\n"
        )

    return note_context


# Goals
def get_relevant_goals(user, user_message):
    goals = user.goals.all()

    relevant_goals = []

    keywords = user_message.lower().split()

    for goal in goals:
        search_text = (
            f"{goal.title} {goal.description}"
        ).lower()

        if any(keyword in search_text for keyword in keywords):
            relevant_goals.append(goal)

    return relevant_goals


def get_goal_context(goals):

    if not goals.exists():
        return "Current Goals: \nNo goals at the moment.\n"

    goal_context = "Current Goals:\n\n"

    for goal in goals:
        goal_context += (
            f"- {goal.title}\n"
            f"  Description: {goal.description or 'No description'}\n"
            f"  Category: {goal.category}\n"
            f"  Priority: {goal.priority}\n"
            f"  Target Date: {goal.target_date or 'No target date'}\n"
            f"  Progress: {goal.progress}%\n"
        )

        milestones = goal.milestones.all()

        if milestones.exists():
            goal_context += "  Milestones:\n"

            for milestone in milestones:
                status = "✓" if milestone.is_completed else "✗"

                goal_context += (
                    f"    {status} {milestone.title}\n"
                )

        goal_context += "\n"

    return goal_context


# Events
def get_relevant_events(user, user_message):
    events = user.events.all()

    relevant_events = []

    keywords = user_message.lower().split()

    for event in events:
        search_text = (
            f"{event.title} {event.description}"
        ).lower()

        if any(keyword in search_text for keyword in keywords):
            relevant_events.append(event)

    return relevant_events


def get_event_context(events):

    if not events.exists():
        return "Current Events:\nNo events at the moment.\n"

    event_context = "Current Events:\n\n"

    for event in events:
        event_context += (
            f"- {event.title}\n"
            f"  Description: {event.description or 'No description'}\n"
            f"  Date: {event.date}\n"
            f"  Start Time: {event.start_time}\n"
            f"  End Time: {event.end_time}\n"
            f"  Reminder Enabled: {'Yes' if event.is_reminder else 'No'}\n"
        )

        if event.is_reminder:
            event_context += (
                f"  Reminder Time: {event.reminder_time}\n"
            )

        event_context += "\n"

    return event_context


# Reminder
def get_relevant_reminders(user, user_message):
    reminders = user.reminders.all()

    relevant_reminders = []

    keywords = user_message.lower().split()

    for reminder in reminders:
        search_text = (
            f"{reminder.title} {reminder.description}"
        ).lower()

        if any(keyword in search_text for keyword in keywords):
            relevant_reminders.append(reminder)

    return relevant_reminders


def get_reminder_context(reminders):

    if not reminders.exists():
        return "Current Reminders: \nNo reminders at the moment.\n"

    reminder_context = "Current Reminders:\n\n"

    for reminder in reminders:
        reminder_context += (
            f"- {reminder.title}\n"
            f"  Description: {reminder.description or 'No description'}\n"
            f"  Date: {reminder.date}\n"
            f"  Time: {reminder.time}\n"
            f"  Repeat: {reminder.repeat}\n\n"
        )

    return reminder_context
