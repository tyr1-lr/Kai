ACTION_RULES = {

    "none": {
        "required": []
    },


    "create_task": {
        "required": ["title"]
    },

    "update_task": {
        "required": []
    },

    "delete_task": {
        "required": []
    },

    "complete_task": {
        "required": []
    },

    "uncomplete_task": {
        "required": []
    },


    "create_note": {
        "required": ["title"]
    },

    "update_note": {
        "required": []
    },

    "delete_note": {
        "required": []
    },


    "create_goal": {
        "required": ["title"]
    },

    "update_goal": {
        "required": []
    },

    "delete_goal": {
        "required": []
    },


    "create_milestone": {
        "required": ["goal_id", "title"]
    },

    "update_milestone": {
        "required": ["milestone_id"]
    },

    "delete_milestone": {
        "required": ["milestone_id"]
    },

    "complete_milestone": {
        "required": ["milestone_id"]
    },

    "uncomplete_milestone": {
        "required": ["milestone_id"]
    },


    "create_event": {
        "required": [
            "title",
            "date",
            "start_time",
            "end_time"
        ]
    },

    "update_event": {
        "required": []
    },

    "delete_event": {
        "required": []
    },



    "create_reminder": {
        "required": [
            "title",
            "date",
            "time"
        ]
    },

    "update_reminder": {
        "required": []
    },

    "delete_reminder": {
        "required": []
    },
}


def validate_action(ai_response):
    intent = ai_response.get("intent")
    data = ai_response.get("data")

    if intent is None:
        return False, "Missing intent."

    if intent not in ACTION_RULES:
        return False, "Invalid intent."

    if data is None:
        return False, "Missing data."

    if not isinstance(data, dict):
        return False, "Data must be an object."

    required_fields = ACTION_RULES[intent]["required"]

    for field in required_fields:
        if not data.get(field):
            return False, f"Missing required field: {field}"
    return True, ""
