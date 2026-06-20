from django.urls import path
from . import views

urlpatterns = [
    path("tasks/", views.TaskListCreate.as_view(), name="task-list"),
    path("tasks/<int:pk>/", views.TaskEdit.as_view(), name="edit-task"),
    path("tasks/delete/<int:pk>/", views.TaskDelete.as_view(), name="delete-task"),
]
