from django.urls import path
from .views import ChatListCreate, ChatRetrieveDelete, GeminiTestView, SendMessageView


urlpatterns = [
    path("chats/", ChatListCreate.as_view(), name="chat-list-create"),
    path("chats/<int:pk>/", ChatRetrieveDelete.as_view(), name="delete-get-note"),
    path("chats/<int:chat_id>/messages/",
         ChatListCreate.as_view(), name="message-list"),
    path(
        "gemini-test/",
        GeminiTestView.as_view()
    ),
    path(
        "chats/<int:chat_id>/send/",
        SendMessageView.as_view()
    ),
]
