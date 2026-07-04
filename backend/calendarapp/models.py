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

    is_sent = models.BooleanField(default=False)

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

    is_sent = models.BooleanField(default=False)

    author = models.ForeignKey(
        Users, on_delete=models.CASCADE, related_name="reminders")

    class Repeat(models.TextChoices):
        NEVER = "NEVER", "Never"
        EVERY_DAY = "EVERY_DAY", "Every Day"
        EVERY_WEEK = "EVERY_WEEK", "Every Week"
        EVERY_MONTH = "EVERY_MONTH", "Every Month"

    repeat = models.CharField(
        max_length=20,
        choices=Repeat.choices,
        default=Repeat.NEVER,
    )

    def __str__(self):
        return self.title


class Notification(models.Model):
    author = models.ForeignKey(
        Users,
        on_delete=models.CASCADE
    )

    event = models.ForeignKey(
        Event,
        null=True,
        blank=True,
        on_delete=models.CASCADE
    )

    reminder = models.ForeignKey(
        Reminder,
        null=True,
        blank=True,
        on_delete=models.CASCADE
    )

    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    @property
    def title(self):
        if self.event:
            return self.event.title
        if self.reminder:
            return self.reminder.title
        return ""

    @property
    def message(self):
        if self.event:
            return f"Your event '{self.event.title}' is starting soon."
        if self.reminder:
            return f"Your reminder '{self.reminder.title}' is due."
        return ""

    @property
    def notification_type(self):
        if self.event:
            return "event"
        if self.reminder:
            return "reminder"
        return ""
