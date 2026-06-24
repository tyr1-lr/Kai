from django.shortcuts import render
from rest_framework import generics
from rest_framework.views import APIView
from .serializer import ChatMessageSerializer, ChatSeralizer
from rest_framework.permissions import IsAuthenticated
from .models import Chat, ChatMessage
from .services import generate_response
from rest_framework.response import Response
from django.shortcuts import get_object_or_404


class ChatListCreate (generics.ListCreateAPIView):
    serializer_class = ChatSeralizer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Chat.objects.filter(
            user=self.request.user
        ).order_by("-updated_at")

    def perform_create(self, serializer):
        serializer.save(
            user=self.request.user
        )


class ChatRetrieveDelete (generics.RetrieveDestroyAPIView):
    serializer_class = ChatSeralizer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Chat.objects.filter(
            user=self.request.user
        )


class ChatMessageList (generics.ListAPIView):
    serializer_class = ChatMessageSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        chat_id = self.kwargs["chat_id"]

        return ChatMessage.objects.filter(
            chat__id=chat_id,
            chat__user=self.request.user
        )


class SendMessageView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, chat_id):
        chat = get_object_or_404(
            Chat,
            id=chat_id,
            user=request.user
        )

        user_message = request.data.get("message")

        if chat.title == "New Chat":
            chat.title = user_message[:30]
            chat.save()

        if not user_message:
            return Response(
                {"error": "Message is required"},
                status=400
            )

        ChatMessage.objects.create(
            chat=chat,
            role="user",
            content=user_message
        )

        try:
            messages = chat.messages.all()

            conversation = ""

            for message in messages:
                conversation += (
                    f"{message.role}: {message.content}\n"
                )

            reply = generate_response(conversation)

            ChatMessage.objects.create(
                chat=chat,
                role="assistant",
                content=reply
            )

            return Response({
                "reply": reply
            })

        except Exception:
            return Response(
                {"error": "AI service temporarily unavailable"},
                status=503
            )


class GeminiTestView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        reply = generate_response(
            "Explain Django in one sentence."
        )

        return Response({
            "reply": reply
        })
