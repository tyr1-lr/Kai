from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import generics, permissions, status
from django.contrib.auth import get_user_model
from .serializers import (
    RegisterSerializer,
    ForgetPasswordSerializer,
    VerifyResetCodeSerializer,
    ResetPasswordSerializer,
    CurrentUserSerializer,
)
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import PasswordResetCode
import secrets
from django.core.mail import send_mail
from django.conf import settings
from django.utils import timezone
from datetime import timedelta
from django.conf import settings


User = get_user_model()


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()

    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]


class CurrentUserView(generics.RetrieveAPIView):
    serializer_class = CurrentUserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user


class ForgetPasswordView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = ForgetPasswordSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        email = serializer.validated_data["email"]

        user = User.objects.filter(email=email).first()

        if not user:
            return Response(
                {"detail": "No account found with this email."},
                status=status.HTTP_404_NOT_FOUND,
            )

        PasswordResetCode.objects.filter(author=user).delete()

        code = str(secrets.randbelow(900000) + 100000)

        PasswordResetCode.objects.create(
            author=user,
            code=code,
        )

        try:
            send_mail(
                subject="Kai Password Reset",
                message=f"""
Hello,

We received a request to reset your Kai account password.

Your verification code is:

{code}

This code will expire in {settings.PASSWORD_RESET_CODE_EXPIRY_MINUTES} minutes.

If you did not request this password reset, you can safely ignore this email.

- Kai Team
""",
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[email],
                fail_silently=False,
            )
        except Exception:
            PasswordResetCode.objects.filter(author=user).delete()

            return Response(
                {"detail": "Failed to send verification email."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )

        return Response(
            {"detail": "Verification code sent successfully."},
            status=status.HTTP_200_OK,
        )


class VerifyResetCodeView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = VerifyResetCodeSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        email = serializer.validated_data["email"]
        code = serializer.validated_data["code"]

        user = User.objects.filter(email=email).first()

        if not user:
            return Response(
                {"detail": "No account found with this email."},
                status=status.HTTP_404_NOT_FOUND,
            )

        reset_code = PasswordResetCode.objects.filter(
            author=user,
            code=code,
        ).first()

        if not reset_code:
            return Response(
                {"detail": "Invalid verification code."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if (
            reset_code.created_at
            + timedelta(minutes=settings.PASSWORD_RESET_CODE_EXPIRY_MINUTES)
            < timezone.now()
        ):
            reset_code.delete()

            return Response(
                {"detail": "Verification code has expired."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        return Response(
            {"detail": "Verification successful."},
            status=status.HTTP_200_OK,
        )


class ResetPasswordView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = ResetPasswordSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        email = serializer.validated_data["email"]
        code = serializer.validated_data["code"]
        new_password = serializer.validated_data["new_password"]

        user = User.objects.filter(email=email).first()

        if not user:
            return Response(
                {"detail": "No account found with this email."},
                status=status.HTTP_404_NOT_FOUND,
            )

        reset_code = PasswordResetCode.objects.filter(
            author=user,
            code=code,
        ).first()

        if not reset_code:
            return Response(
                {"detail": "Invalid verification code."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        if (
            reset_code.created_at
            + timedelta(minutes=settings.PASSWORD_RESET_CODE_EXPIRY_MINUTES)
            < timezone.now()
        ):
            reset_code.delete()

            return Response(
                {"detail": "Verification code has expired."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        user.set_password(new_password)
        user.save()

        reset_code.delete()

        return Response(
            {"detail": "Password reset successfully."},
            status=status.HTTP_200_OK,
        )
