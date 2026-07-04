from django.utils import timezone
from .models import Notification, Event, Reminder


class NotificationService:

    @staticmethod
    def check_notifications(user):
        total = 0

        total += NotificationService.check_events(user)
        total += NotificationService.check_reminders(user)

        return total

    @staticmethod
    def check_events(user):

        today = timezone.localdate()
        current_time = timezone.localtime().time()

        events = Event.objects.filter(
            author=user,
            is_reminder=True,
            is_sent=False,
            date=today,
            reminder_time__lte=current_time,
        )

        created = 0

        for event in events:
            Notification.objects.create(
                author=user,
                event=event,
            )

            event.is_sent = True
            event.save(update_fields=["is_sent"])

            created += 1

        return created

    @staticmethod
    def check_reminders(user):

        today = timezone.localdate()
        current_time = timezone.localtime().time()

        reminders = Reminder.objects.filter(
            author=user,
            is_sent=False,
            date=today,
            time__lte=current_time,
        )

        created = 0

        for reminder in reminders:
            Notification.objects.create(
                author=user,
                reminder=reminder,
            )

            reminder.is_sent = True
            reminder.save(update_fields=["is_sent"])

            created += 1

        return created
