from django.urls import re_path

from backend.chat import consumers

websocket_urlpatterns = [
    re_path(r"ws/chat/(?P<listing_id>\w+)/$", consumers.ChatConsumer.as_asgi()),
]
