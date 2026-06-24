from django.db import models
from account.models import Users


class Chat(models.Model):
    user = models.ForeignKey(
        Users, on_delete=models.CASCADE, related_name="chats")
    title = models.CharField(max_length=225, default="New Chat")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title


class ChatMessage(models.Model):
    ROLE_CHOICES = (
        ("user", "User"),
        ("assistant", "Assistant"),
    )

    chat = models.ForeignKey(
        Chat, on_delete=models.CASCADE, related_name="messages")
    role = models.CharField(max_length=20, choices=ROLE_CHOICES)

    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["created_at"]

    def __str__(self):
        return f"{self.role}: {self.content[:50]}"
