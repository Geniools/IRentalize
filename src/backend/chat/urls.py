from django.urls import path, include
from rest_framework import routers

from backend.chat import views

router = routers.DefaultRouter()

router.register(r'messages/host', views.ChatMessageHostListAPIView, basename='messages-host')
router.register(r'messages/guest', views.ChatMessageGuestListAPIView, basename='messages-guest')
router.register(r'rooms/host', views.ChatRoomHostListAPIView, basename='rooms-host')
router.register(r'rooms/guest', views.ChatRoomGuestListAPIView, basename='rooms-guest')

urlpatterns = [
    path('', include(router.urls)),
]
