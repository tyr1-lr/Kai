
def get_chat_context(chat):
    messages = chat.messages.all()

    conversation = ""

    for message in messages:
        conversation += (
            f"{message.role}: {message.content}\n"
        )

    return conversation
