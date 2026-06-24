from rest_framework import serializers
from .models import Chat, ChatMessage


class ChatMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatMessage
        fields = "__all__"
        read_only_fields = ["id", "created_at"]


class ChatSeralizer(serializers.ModelSerializer):
    class Meta:
        model = Chat
        fields = "__all__"
        read_only_fields = [
            "id",
            "user",
            "created_at",
            "updated_at"
        ]
