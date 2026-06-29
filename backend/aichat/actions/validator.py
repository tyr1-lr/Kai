ACTION_RULES = {
    "none": {
        "required": []
    },

    "create_task": {
        "required": ["title"]
    },

    "create_note": {
        "required": [
            "title",
            "content"
        ]
    }
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
        if field not in data:
            return False, f"Missing required field: {field}"
    return True, ""
