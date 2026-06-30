from django.db import models
from account.models import Users


class Goal(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    target_date = models.DateField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    author = models.ForeignKey(
        Users, on_delete=models.CASCADE, related_name="goals")

    class Category(models.TextChoices):
        LEARNING = "LEARNING", "Learning"
        CAREER = "CAREER", "Career"
        FINANCE = "FINANCE", "Finance"
        PERSONAL_GROWTH = "PERSONAL_GROWTH", "Personal_Growth"

    class Priority(models.TextChoices):
        HIGH = "HIGH", "High"
        MEDIUM = "MEDIUM", "Medium"
        LOW = "LOW", "Low"

    category = models.CharField(
        max_length=15, choices=Category.choices, default=Category.LEARNING)
    priority = models.CharField(
        max_length=10, choices=Priority.choices, default=Priority.MEDIUM)

    def __str__(self):
        return self.title

    @property
    def progress(self):
        total = self.milestones.count()

        if total == 0:
            return 0

        completed = self.milestones.filter(
            is_completed=True
        ).count()

        progress = (completed / total) * 100

        return round(progress)


class Milestone(models.Model):
    goal = models.ForeignKey(
        Goal,
        on_delete=models.CASCADE,
        related_name="milestones"
    )

    title = models.CharField(max_length=100)
    is_completed = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
