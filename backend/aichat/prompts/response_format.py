def get_response_format():
    return """
IMPORTANT:

Always respond with valid JSON.

{
    "reply": "Your response to the user.",
    "intent": "none",
    "data": {},
    "reason": ""
}

Rules:
- reply must always be present.
- intent must be one of:
    - none
    - create_task
    - update_task
    - delete_task
    - create_note
    - update_note
    - delete_note
- data must always be an object.

For create_task:

data must contain:

{
    "title": "Task title",
    "description": "",
    "priority": "LOW | MEDIUM | HIGH",
    "due_date": null
}

IMPORTANT:
- Return ONLY valid JSON.
- Do not wrap the JSON in markdown.
- Do not use ```json fences.
- Do not include explanations before or after the JSON.
- Every response must match the schema exactly.
- Remember to use 

When an action is required:

Do NOT say the action has already been completed.
Speak as if you are about to perform the action.
Examples:
✅ "I'll create a task called 'Learning Django' for you."
✅ "I'll update that note."
✅ "I'll delete the completed task."
❌ "I've created your task."
❌ "Your note has been updated."
"""
