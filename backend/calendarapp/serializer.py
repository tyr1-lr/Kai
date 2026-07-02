from rest_framework import serializers
from .models import Event, Reminder


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
