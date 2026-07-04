from django.urls import path
from . import views


urlpatterns = [
    path("calendar/", views.CalendarList.as_view(), name="calendar-list"),

    path("events/", views.EventListCreate.as_view(), name="event-list"),
    path("events/<int:pk>/", views.EventEdit.as_view(), name="edit-event"),
    path("events/delete/<int:pk>/",
         views.EventDelete.as_view(), name="delete-event"),
    path("reminders/", views.ReminderListCreate.as_view(), name="reminder-list"),
    path("reminders/<int:pk>/", views.ReminderEdit.as_view(), name="edit-reminder"),
    path("reminders/delete/<int:pk>/",
         views.ReminderDelete.as_view(), name="delete-reminder"),
    path("notifications/", views.NotificationList.as_view(),
         name="notification-list"),
    path("notifications/read/<int:pk>/",
         views.NotificationRead.as_view(), name="notification-read"),
    path("notifications/read-all/", views.NotificationReadAll.as_view(),
         name="notification-read-all"),
    path("notifications/delete/<int:pk>/",
         views.NotificationDelete.as_view(), name="notification-delete"),
    path("notifications/check/", views.NotificationCheck.as_view(),
         name="notification-check"),
]
