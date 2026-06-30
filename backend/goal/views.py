from django.shortcuts import render, get_object_or_404
from rest_framework import generics
from .serializer import GoalSerializer, MilestoneSerializer
from rest_framework.permissions import IsAuthenticated
from .models import Goal, Milestone


class GoalListCreate (generics.ListCreateAPIView):
    serializer_class = GoalSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Goal.objects.filter(author=user)

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class GoalEdit (generics.RetrieveUpdateAPIView):
    serializer_class = GoalSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Goal.objects.filter(author=user)


class GoalDelete (generics.DestroyAPIView):
    serializer_class = GoalSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Goal.objects.filter(author=user)


class MilestoneListCreate(generics.ListCreateAPIView):
    serializer_class = MilestoneSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        goal = get_object_or_404(
            Goal,
            id=self.kwargs["goal_id"],
            author=self.request.user
        )
        return Milestone.objects.filter(goal=goal)

    def perform_create(self, serializer):
        goal = get_object_or_404(
            Goal,
            id=self.kwargs["goal_id"],
            author=self.request.user
        )

        serializer.save(goal=goal)


class MilestoneEdit(generics.RetrieveUpdateAPIView):
    serializer_class = MilestoneSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Milestone.objects.filter(
            goal__author=self.request.user
        )


class MilestoneDelete(generics.DestroyAPIView):
    serializer_class = MilestoneSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Milestone.objects.filter(
            goal__author=self.request.user
        )
