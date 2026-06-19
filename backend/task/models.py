from django.db import models
from account.models import Users


class Task(models.Model):
    title = models.CharField(max_length=50)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    due_date = models.DateField(null=True, blank=True)
    is_completed = models.BooleanField(default=False)
    author = models.ForeignKey(
        Users, on_delete=models.CASCADE, related_name="tasks")

    class Priority(models.TextChoices):
        HIGH = "HIGH", "High"
        MEDIUM = "MEDIUM", "Medium"
        LOW = "LOW", "Low"

    priority = models.CharField(
        max_length=10, choices=Priority.choices, default=Priority.MEDIUM)

    def __str__(self):
        return self.title
