from django.urls import path, include
from rest_framework import routers

from backend.chat import views

router = routers.DefaultRouter()

# Register the chat views for viewing the chat rooms and messages
router.register(r'messages/host', views.ChatMessageHostListAPIView, basename='messages-host')
router.register(r'messages/guest', views.ChatMessageGuestListAPIView, basename='messages-guest')
router.register(r'rooms/host', views.ChatRoomHostListAPIView, basename='rooms-host')
router.register(r'rooms/guest', views.ChatRoomGuestListAPIView, basename='rooms-guest')

# Register the chat view for creating a new chat room
router.register(r'create-room', views.ChatRoomCreateAPIView, basename='create-chat-room')

urlpatterns = [
    path('', include(router.urls)),
]
