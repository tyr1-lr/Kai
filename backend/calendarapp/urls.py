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
]
