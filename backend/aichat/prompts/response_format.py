def get_response_format():
    return """
IMPORTANT:

Always respond with valid JSON.

{
    "reply": "Your response to the user.",
    "intent": "none",
    "data": {}
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
- Output ONLY JSON.
"""
