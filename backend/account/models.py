from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db import models


class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("Email is required")

        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)

        return self.create_user(email, password, **extra_fields)


class Users(AbstractUser):
    email = models.EmailField(unique=True)

    bio = models.TextField(blank=True)

    username = models.CharField(max_length=150, unique=True)

    class Occupation (models.TextChoices):
        STUDENT = "STUDENT", "Student"
        TEACHER = "TEACHER", "Teacher"
        ENGINEER = "ENGINEER", "Engineer"
        SOFTWARE_DEVELOPER = "SOFTWARE_DEVELOPER", "Software Developer"
        DESIGNER = "DESIGNER", "Designer"
        BUSINESS_OWNER = "BUSINESS_OWNER", "Business Owner"
        OFFICE_WORKER = "OFFICE_WORKER", "Office Worker"
        FREELANCER = "FREELANCER", "Freelancer"
        HEALTHCARE_WORKER = "HEALTHCARE_WORKER", "Healthcare Worker"
        GOVERNMENT_EMPLOYEE = "GOVERNMENT_EMPLOYEE", "Government Employee"
        SALES_REPRESENTATIVE = "SALES_REPRESENTATIVE", "Sales Representative"
        CUSTOMER_SERVICE = "CUSTOMER_SERVICE", "Customer Service"
        ACCOUNTANT = "ACCOUNTANT", "Accountant"
        MARKETING_SPECIALIST = "MARKETING_SPECIALIST", "Marketing Specialist"
        LAWYER = "LAWYER", "Lawyer"
        ARCHITECT = "ARCHITECT", "Architect"
        MECHANIC = "MECHANIC", "Mechanic"
        TECHNICIAN = "TECHNICIAN", "Technician"
        ELECTRICIAN = "ELECTRICIAN", "Electrician"
        PLUMBER = "PLUMBER", "Plumber"
        CONSTRUCTION_WORKER = "CONSTRUCTION_WORKER", "Construction Worker"
        DRIVER = "DRIVER", "Driver"
        CHEF = "CHEF", "Chef"
        CASHIER = "CASHIER", "Cashier"
        RETAIL_WORKER = "RETAIL_WORKER", "Retail Worker"
        FACTORY_WORKER = "FACTORY_WORKER", "Factory Worker"
        FARMER = "FARMER", "Farmer"
        POLICE_OFFICER = "POLICE_OFFICER", "Police Officer"
        FIREFIGHTER = "FIREFIGHTER", "Firefighter"
        MILITARY = "MILITARY", "Military"
        SCIENTIST = "SCIENTIST", "Scientist"
        RESEARCHER = "RESEARCHER", "Researcher"
        JOURNALIST = "JOURNALIST", "Journalist"
        WRITER = "WRITER", "Writer"
        CONTENT_CREATOR = "CONTENT_CREATOR", "Content Creator"
        PHOTOGRAPHER = "PHOTOGRAPHER", "Photographer"
        ARTIST = "ARTIST", "Artist"
        MUSICIAN = "MUSICIAN", "Musician"
        CONSULTANT = "CONSULTANT", "Consultant"
        HUMAN_RESOURCES = "HUMAN_RESOURCES", "Human Resources"
        PROJECT_MANAGER = "PROJECT_MANAGER", "Project Manager"
        ENTREPRENEUR = "ENTREPRENEUR", "Entrepreneur"
        SELF_EMPLOYED = "SELF_EMPLOYED", "Self-Employed"
        UNEMPLOYED = "UNEMPLOYED", "Unemployed"
        RETIRED = "RETIRED", "Retired"
        OTHER = "OTHER", "Other"

    occupation = models.CharField(
        max_length=50, choices=Occupation.choices, default=Occupation.STUDENT)

    class TimeZone (models.TextChoices):
        UTC = "UTC", "UTC"
        ASIA_MANILA = "Asia/Manila", "Asia/Manila (UTC+08:00)"
        ASIA_TOKYO = "Asia/Tokyo", "Asia/Tokyo (UTC+09:00)"
        ASIA_SEOUL = "Asia/Seoul", "Asia/Seoul (UTC+09:00)"
        ASIA_SHANGHAI = "Asia/Shanghai", "Asia/Shanghai (UTC+08:00)"
        ASIA_SINGAPORE = "Asia/Singapore", "Asia/Singapore (UTC+08:00)"
        ASIA_BANGKOK = "Asia/Bangkok", "Asia/Bangkok (UTC+07:00)"
        ASIA_JAKARTA = "Asia/Jakarta", "Asia/Jakarta (UTC+07:00)"
        ASIA_DUBAI = "Asia/Dubai", "Asia/Dubai (UTC+04:00)"
        EUROPE_LONDON = "Europe/London", "Europe/London"
        EUROPE_PARIS = "Europe/Paris", "Europe/Paris"
        EUROPE_BERLIN = "Europe/Berlin", "Europe/Berlin"
        AMERICA_NEW_YORK = "America/New_York", "America/New_York"
        AMERICA_CHICAGO = "America/Chicago", "America/Chicago"
        AMERICA_DENVER = "America/Denver", "America/Denver"
        AMERICA_LOS_ANGELES = "America/Los_Angeles", "America/Los_Angeles"
        AUSTRALIA_SYDNEY = "Australia/Sydney", "Australia/Sydney"
        PACIFIC_AUCKLAND = "Pacific/Auckland", "Pacific/Auckland"

    timezone = models.CharField(
        max_length=50, choices=TimeZone.choices, default=TimeZone.ASIA_MANILA,)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    avatar = models.ImageField(upload_to="avatars/", blank=True, null=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]

    objects = UserManager()


class PasswordResetCode(models.Model):
    author = models.ForeignKey(
        Users,
        on_delete=models.CASCADE,
        related_name="password_reset_codes",
    )

    code = models.CharField(max_length=6)

    created_at = models.DateTimeField(auto_now_add=True)
