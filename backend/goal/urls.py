from django.urls import path
from . import views

urlpatterns = [
    path("goals/",
         views.GoalListCreate.as_view(), name="goal-list"),
    path("goals/<int:pk>/",
         views.GoalEdit.as_view(), name="goal-edit"),
    path("goals/delete/<int:pk>/",
         views.GoalDelete.as_view(), name="goal-delete"),
    path(
        "goals/<int:goal_id>/milestones/",
        views.MilestoneListCreate.as_view(),
        name="milestone-list-create",
    ),
    path(
        "milestones/<int:pk>/",
        views.MilestoneEdit.as_view(),
        name="milestone-edit",
    ),
    path(
        "milestones/delete/<int:pk>/",
        views.MilestoneDelete.as_view(),
        name="milestone-delete",
    ),
]
