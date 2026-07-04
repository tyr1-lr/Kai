from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializer import EventSerializer, ReminderSerializer, NotificationSerializer
from .models import Event, Reminder, Notification
from .services import NotificationService


class CalendarList (APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = self.request.user

        events = Event.objects.filter(author=user)
        reminders = Reminder.objects.filter(author=user)

        event_serializer = EventSerializer(events, many=True)
        reminder_serializer = ReminderSerializer(reminders, many=True)

        data = {
            "events": event_serializer.data,
            "reminders": reminder_serializer.data
        }

        return Response(data)


class EventListCreate (generics.ListCreateAPIView):
    serializer_class = EventSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Event.objects.filter(author=user)

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class EventEdit (generics.RetrieveUpdateAPIView):
    serializer_class = EventSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Event.objects.filter(author=user)


class EventDelete (generics.DestroyAPIView):
    serializer_class = EventSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Event.objects.filter(author=user)


class ReminderListCreate (generics.ListCreateAPIView):
    serializer_class = ReminderSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Reminder.objects.filter(author=user)

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class ReminderEdit (generics.RetrieveUpdateAPIView):
    serializer_class = ReminderSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Reminder.objects.filter(author=user)


class ReminderDelete (generics.DestroyAPIView):
    serializer_class = ReminderSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Reminder.objects.filter(author=user)


class NotificationList (generics.ListAPIView):
    serializer_class = NotificationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Notification.objects.filter(author=user).order_by("-created_at")


class NotificationDelete (generics.DestroyAPIView):
    serializer_class = NotificationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Notification.objects.filter(author=user)


class NotificationRead(APIView):
    permission_classes = [IsAuthenticated]

    def patch(self, request, pk):
        notification = Notification.objects.get(
            pk=pk,
            author=request.user
        )

        notification.is_read = True
        notification.save()

        return Response({
            "message": "Notification marked as read."
        })


class NotificationReadAll (APIView):
    permission_classes = [IsAuthenticated]

    def patch(self, request):
        user = self.request.user

        unread_notifications = Notification.objects.filter(
            author=user,
            is_read=False
        )

        unread_notifications.update(is_read=True)

        return Response({
            "message": "All notifications marked as read."
        })


class NotificationCheck(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        total = NotificationService.check_notifications(request.user)

        return Response({
            "new_notifications": total
        })
