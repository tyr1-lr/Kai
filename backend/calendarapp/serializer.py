from rest_framework import serializers
from .models import Event, Reminder, Notification


class EventSerializer (serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = "__all__"
        extra_kwargs = {
            "author": {"read_only": True}
        }


class ReminderSerializer (serializers.ModelSerializer):
    class Meta:
        model = Reminder
        fields = "__all__"
        extra_kwargs = {
            "author": {"read_only": True}
        }


class NotificationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Notification
        fields = [
            "id",
            "event",
            "reminder",
            "title",
            "message",
            "notification_type",
            "is_read",
            "created_at",
        ]
        read_only_fields = [
            "title",
            "message",
            "notification_type",
            "created_at",
        ]
