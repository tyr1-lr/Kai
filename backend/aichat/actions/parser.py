import json


def parse_ai_response(response_text):
    return json.loads(response_text)
