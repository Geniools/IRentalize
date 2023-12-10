from rest_framework.mixins import ListModelMixin
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import GenericViewSet

from backend.chat.models import ChatMessage, ChatRoom
from backend.chat.permissions import IsChatMember
from backend.chat.serializers import ChatRoomSerializer


# API view to be inherited by the other chat views
class ChatAPIView(ListModelMixin, GenericViewSet):
    serializer_class = ChatRoomSerializer
    permission_classes = [IsAuthenticated, IsChatMember]
    pagination_class = None
    
    def get_queryset(self):
        raise NotImplementedError('You must implement the get_queryset method')


# API view for the host to see their chat rooms with the guest(s)
class ChatRoomHostListAPIView(ChatAPIView):
    def get_queryset(self):
        # Return the chat messages in witch the user is the guest or the host
        return ChatRoom.objects.filter(listing__host=self.request.user)


# API view for the guests to see their chat rooms with the host(s)
class ChatRoomGuestListAPIView(ChatAPIView):
    def get_queryset(self):
        # Return the chat messages in witch the user is the guest or the host
        return ChatRoom.objects.filter(guest=self.request.user)


# API view for the host to see their messages with the guest(s)
class ChatMessageHostListAPIView(ChatAPIView):
    def get_queryset(self):
        # Return the chat messages in witch the user is the guest or the host
        return ChatMessage.objects.filter(chat_room__listing__host=self.request.user)


# API view for the guests to see their messages with the host(s)
class ChatMessageGuestListAPIView(ChatAPIView):
    def get_queryset(self):
        # Return the chat messages in witch the user is the guest or the host
        return ChatMessage.objects.filter(chat_room__guest=self.request.user)
