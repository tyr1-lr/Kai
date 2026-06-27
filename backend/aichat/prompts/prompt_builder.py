
from .identity import get_identity
from .conversation import get_chat_context
from .response_format import get_response_format
from .context import (
    get_goal_context,
    get_note_context,
    get_task_context,
    get_relevant_tasks,
    get_relevant_notes
)


def build_prompt(user, chat, user_message):
    identity = get_identity()
    response_format = get_response_format()
    chat_context = get_chat_context(chat)
    task_context = get_relevant_tasks(
        user,
        user_message
    )
    note_context = get_relevant_notes(
        user,
        user_message
    )
    goal_context = get_goal_context()

    prompt = f"""
    ========== SYSTEM ==========
    {identity}

    ========== USER CONTEXT ==========
    {task_context}
    {note_context}
    {goal_context}

    ========== CONVERSATION ==========
    {chat_context}

    ========== RESPONSE FORMAT ==========
    {response_format}

    ========== CURRENT USER MESSAGE ==========
    {user_message}

    Continue the conversation naturally.

    """

    return prompt
