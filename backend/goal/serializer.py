from rest_framework import serializers
from .models import Goal, Milestone


class MilestoneSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField(required=False)

    class Meta:
        model = Milestone
        fields = [
            "id",
            "title",
            "is_completed",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ("created_at", "updated_at")


class GoalSerializer(serializers.ModelSerializer):
    milestones = MilestoneSerializer(many=True, required=False)
    progress = serializers.ReadOnlyField()

    class Meta:
        model = Goal
        fields = [
            "id",
            "title",
            "description",
            "target_date",
            "created_at",
            "updated_at",
            "category",
            "priority",
            "progress",
            "milestones",
        ]
        read_only_fields = ("created_at", "updated_at")

    def create(self, validated_data):
        milestones_data = validated_data.pop("milestones", [])

        goal = Goal.objects.create(**validated_data)

        for milestone in milestones_data:
            Milestone.objects.create(goal=goal, **milestone)

        return goal

    def update(self, instance, validated_data):
        milestones_data = validated_data.pop("milestones", None)

        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        instance.save()

        if milestones_data is not None:
            existing = {m.id: m for m in instance.milestones.all()}
            keep_ids = []

            for milestone_data in milestones_data:
                milestone_id = milestone_data.get("id")

                if milestone_id and milestone_id in existing:
                    milestone = existing[milestone_id]

                    milestone.title = milestone_data["title"]
                    milestone.is_completed = milestone_data["is_completed"]
                    milestone.save()

                    keep_ids.append(milestone.id)

                else:
                    milestone = Milestone.objects.create(
                        goal=instance,
                        **milestone_data
                    )

                    keep_ids.append(milestone.id)

            instance.milestones.exclude(id__in=keep_ids).delete()

        return instance
