from goal.models import Goal, Milestone


def find_goal(user, data):
    if data.get("id"):
        return Goal.objects.filter(
            id=data["id"],
            author=user
        ).first()

    if not data.get("title"):
        return None

    return Goal.objects.filter(
        author=user,
        title__icontains=data["title"]
    ).first()


def create_goal(user, data):
    goal = Goal.objects.create(
        author=user,
        title=data["title"],
        description=data.get("description") or "",
        target_date=data.get("target_date"),
        category=data.get("category", "LEARNING"),
        priority=data.get("priority", "MEDIUM")
    )

    return {
        "success": True,
        "action": "create_goal",
        "message": "Goal created successfully.",
        "goal_id": goal.id
    }


def update_goal(user, data):
    goal = find_goal(user, data)

    if not goal:
        return {
            "success": False,
            "action": "update_goal",
            "message": "Goal not found."
        }

    goal.title = data.get("title", goal.title)
    goal.description = data.get("description", goal.description)
    goal.target_date = data.get("target_date", goal.target_date)
    goal.category = data.get("category", goal.category)
    goal.priority = data.get("priority", goal.priority)

    goal.save()

    return {
        "success": True,
        "action": "update_goal",
        "message": "Goal updated successfully.",
        "goal_id": goal.id
    }


def delete_goal(user, data):
    goal = find_goal(user, data)

    if not goal:
        return {
            "success": False,
            "action": "delete_goal",
            "message": "Goal not found."
        }

    goal.delete()

    return {
        "success": True,
        "action": "delete_goal",
        "message": "Goal deleted successfully."
    }


def find_milestone(user, milestone_id):
    return Milestone.objects.filter(
        id=milestone_id,
        goal__author=user
    ).first()


def create_milestone(goal_id, user, data):

    goal = Goal.objects.filter(
        id=goal_id,
        author=user
    ).first()

    if not goal:
        return {
            "success": False,
            "action": "create_milestone",
            "message": "Goal not found."
        }

    milestone = Milestone.objects.create(
        goal=goal,
        title=data["title"],
        is_completed=data.get("is_completed", False)
    )

    return {
        "success": True,
        "action": "create_milestone",
        "message": "Milestone created successfully.",
        "milestone_id": milestone.id
    }


def update_milestone(milestone_id, user, data):
    milestone = find_milestone(user, milestone_id)

    if not milestone:
        return {
            "success": False,
            "action": "update_milestone",
            "message": "Milestone not found."
        }

    milestone.title = data.get("title", milestone.title)

    milestone.save()

    return {
        "success": True,
        "action": "update_milestone",
        "message": "Milestone updated successfully.",
        "milestone_id": milestone.id
    }


def delete_milestone(milestone_id, user):
    milestone = find_milestone(user, milestone_id)

    if not milestone:
        return {
            "success": False,
            "action": "delete_milestone",
            "message": "Milestone not found."
        }

    milestone.delete()

    return {
        "success": True,
        "action": "delete_milestone",
        "message": "Milestone deleted successfully."
    }


def complete_milestone(milestone_id, user):
    milestone = find_milestone(user, milestone_id)

    if not milestone:
        return {
            "success": False,
            "action": "complete_milestone",
            "message": "Milestone not found."
        }

    milestone.is_completed = True
    milestone.save()

    return {
        "success": True,
        "action": "complete_milestone",
        "message": "Milestone marked as completed.",
        "milestone_id": milestone.id
    }


def uncomplete_milestone(milestone_id, user):
    milestone = find_milestone(user, milestone_id)

    if not milestone:
        return {
            "success": False,
            "action": "uncomplete_milestone",
            "message": "Milestone not found."
        }

    milestone.is_completed = False
    milestone.save()

    return {
        "success": True,
        "action": "uncomplete_milestone",
        "message": "Milestone marked as uncompleted.",
        "milestone_id": milestone.id
    }
