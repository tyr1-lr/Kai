from django.db import models
from account.models import Users


class Event (models.Model):
    title = models.CharField(max_length=100)
    date = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()
    description = models.TextField(blank=True)

    is_reminder = models.BooleanField(default=False)
    reminder_time = models.TimeField(blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    author = models.ForeignKey(
        Users, on_delete=models.CASCADE, related_name="events")

    def __str__(self):
        return self.title


class Reminder (models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField(blank=True)

    date = models.DateField()
    time = models.TimeField()

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    author = models.ForeignKey(
        Users, on_delete=models.CASCADE, related_name="reminders")

    class Repeat(models.TextChoices):
        NEVER = "NEVER", "Never"
        EVERY_DAY = "EVERY_DAY", "Every Day"
        EVERY_WEEK = "EVERY_WEEK", "Every Week"
        EVERY_MONTH = "EVERY_MONTH", "Every Month"

    repeat = models.CharField(
        max_length=20, choices=Repeat.choices, default=Repeat.NEVER)

    def __str__(self):
        return self.title
