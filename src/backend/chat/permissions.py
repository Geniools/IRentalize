from rest_framework.permissions import BasePermission

from backend.chat.models import ChatRoom, ChatMessage


class IsChatMember(BasePermission):
    def has_object_permission(self, request, view, obj):
        if isinstance(obj, ChatRoom):
            return request.user in (obj.guest, obj.listing.host)
        elif isinstance(obj, ChatMessage):
            return request.user in (obj.chat_room.guest, obj.chat_room.listing.host)
