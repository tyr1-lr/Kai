
from .identity import get_identity
from .conversation import get_chat_context
from .response_format import get_response_format
from .context import (
    get_task_context,
    get_relevant_tasks,
    get_note_context,
    get_relevant_notes,
    get_goal_context,
    get_relevant_goals,
    get_event_context,
    get_relevant_events,
    get_reminder_context,
    get_relevant_reminders
)


def build_prompt(user, chat, user_message):
    identity = get_identity()
    response_format = get_response_format()
    chat_context = get_chat_context(chat)

    relevant_tasks = get_relevant_tasks(user, user_message)
    task_context = get_task_context(relevant_tasks)

    relevant_notes = get_relevant_notes(user, user_message)
    note_context = get_note_context(relevant_notes)

    relevant_goals = get_relevant_goals(user, user_message)
    goal_context = get_goal_context(relevant_goals)

    relevant_events = get_relevant_events(user, user_message)
    event_context = get_event_context(relevant_events)

    relevant_reminders = get_relevant_reminders(user, user_message)
    reminder_context = get_reminder_context(relevant_reminders)

    prompt = f"""
    ========== SYSTEM ==========
    {identity}

    ========== USER CONTEXT ==========
    {task_context}

    {note_context}

    {goal_context}

    {event_context}

    {reminder_context}

    ========== CONVERSATION ==========
    {chat_context}

    ========== RESPONSE FORMAT ==========
    {response_format}

    ========== CURRENT USER MESSAGE ==========
    {user_message}

    Continue the conversation naturally.

    """

    return prompt
