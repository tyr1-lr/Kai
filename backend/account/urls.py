from django.urls import path
from .views import (
    RegisterView,
    ForgetPasswordView,
    VerifyResetCodeView,
    ResetPasswordView,
    CurrentUserView,
    UpdateProfileView
)

urlpatterns = [
    path('register/', RegisterView.as_view()),
    path("me/", CurrentUserView.as_view()),
    path("profile/update/", UpdateProfileView.as_view()),
    path("forgot-password/", ForgetPasswordView.as_view()),
    path("verify-reset-code/", VerifyResetCodeView.as_view()),
    path("reset-password/", ResetPasswordView.as_view()),
]
