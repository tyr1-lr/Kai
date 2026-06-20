from django.db import models
from account.models import Users


class Note(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    author = models.ForeignKey(
        Users, on_delete=models.CASCADE, related_name="notes")

    def __str__(self):
        return self.title
