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
- data must always be an object.
- reason may be empty.
- Return ONLY valid JSON.
- Do not wrap the JSON in markdown.
- Do not use ```json fences.
- Do not include explanations before or after the JSON.
- Every response must match the schema exactly.

Valid intents:

- none

# Tasks
- create_task
- update_task
- delete_task
- complete_task
- uncomplete_task

# Notes
- create_note
- update_note
- delete_note

# Goals
- create_goal
- update_goal
- delete_goal

# Milestones
- create_milestone
- update_milestone
- delete_milestone
- complete_milestone
- uncomplete_milestone

# Events
- create_event
- update_event
- delete_event

# Reminders
- create_reminder
- update_reminder
- delete_reminder

-------------------------------------------------
create_task

{
    "title": "",
    "description": "",
    "priority": "LOW | MEDIUM | HIGH",
    "due_date": null
}

-------------------------------------------------
update_task

{
    "id": null,
    "title": "",
    "description": "",
    "priority": "LOW | MEDIUM | HIGH",
    "due_date": null
}

-------------------------------------------------
delete_task

{
    "id": null,
    "title": ""
}

-------------------------------------------------
complete_task

{
    "id": null,
    "title": ""
}

-------------------------------------------------
uncomplete_task

{
    "id": null,
    "title": ""
}

-------------------------------------------------
create_note

{
    "title": "",
    "content": ""
}

-------------------------------------------------
update_note

{
    "id": null,
    "title": "",
    "content": ""
}

-------------------------------------------------
delete_note

{
    "id": null,
    "title": ""
}

-------------------------------------------------
create_goal

{
    "title": "",
    "description": "",
    "target_date": null,
    "category": "LEARNING | CAREER | FINANCE | PERSONAL_GROWTH",
    "priority": "LOW | MEDIUM | HIGH"
}

-------------------------------------------------
update_goal

{
    "id": null,
    "title": "",
    "description": "",
    "target_date": null,
    "category": "LEARNING | CAREER | FINANCE | PERSONAL_GROWTH",
    "priority": "LOW | MEDIUM | HIGH"
}

-------------------------------------------------
delete_goal

{
    "id": null,
    "title": ""
}

-------------------------------------------------
create_milestone

{
    "goal_id": null,
    "title": ""
}

-------------------------------------------------
update_milestone

{
    "milestone_id": null,
    "title": ""
}

-------------------------------------------------
delete_milestone

{
    "milestone_id": null
}

-------------------------------------------------
complete_milestone

{
    "milestone_id": null
}

-------------------------------------------------
uncomplete_milestone

{
    "milestone_id": null
}

-------------------------------------------------
create_event

{
    "title": "",
    "description": "",
    "date": null,
    "start_time": null,
    "end_time": null,
    "is_reminder": false,
    "reminder_time": null
}

-------------------------------------------------
update_event

{
    "id": null,
    "title": "",
    "description": "",
    "date": null,
    "start_time": null,
    "end_time": null,
    "is_reminder": false,
    "reminder_time": null
}

-------------------------------------------------
delete_event

{
    "id": null,
    "title": ""
}

-------------------------------------------------
create_reminder

{
    "title": "",
    "description": "",
    "date": null,
    "time": null,
    "repeat": "NEVER | EVERY_DAY | EVERY_WEEK | EVERY_MONTH"
}

-------------------------------------------------
update_reminder

{
    "id": null,
    "title": "",
    "description": "",
    "date": null,
    "time": null,
    "repeat": "NEVER | EVERY_DAY | EVERY_WEEK | EVERY_MONTH"
}

-------------------------------------------------
delete_reminder

{
    "id": null,
    "title": ""
}

When an action is required:

Do NOT say the action has already been completed.

Instead, speak as if you are about to perform the action.

Examples:

✅ "I'll create a task called 'Learn Django' for you."
✅ "I'll update your reminder."
✅ "I'll delete that note."

❌ "I've created your task."
❌ "Your reminder has been updated."

If no action is required, set:

intent = "none"

and leave

data = {}

"""
