from google import genai
from django.conf import settings

client = genai.Client(
    api_key=settings.GEMINI_API_KEY
)


def generate_response(prompt):
    try:
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt
        )

        return response.text

    except Exception as e:
        return f"Error generating response: {str(e)}"
