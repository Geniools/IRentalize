from django.http import QueryDict
from rest_framework import status
from rest_framework.exceptions import ParseError
from rest_framework.mixins import ListModelMixin, CreateModelMixin
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet

from backend.chat.models import ChatMessage, ChatRoom
from backend.chat.permissions import IsChatMember
from backend.chat.serializers import ChatRoomSerializer, ChatMessageSerializer, ChatRoomCreateSerializer


# API view to be inherited by the other chat views
class ChatAPIView(ListModelMixin, GenericViewSet):
    permission_classes = [IsAuthenticated, IsChatMember]
    pagination_class = None
    
    def get_queryset(self):
        raise NotImplementedError('You must implement the get_queryset method')


# API view for the host to see their chat rooms with the guest(s)
class ChatRoomHostListAPIView(ChatAPIView):
    serializer_class = ChatRoomSerializer
    
    def get_queryset(self):
        # Return the chat messages in witch the user is the guest or the host
        return ChatRoom.objects.filter(listing__host=self.request.user)


# API view for the guests to see their chat rooms with the host(s)
class ChatRoomGuestListAPIView(ChatAPIView):
    serializer_class = ChatRoomSerializer
    
    def get_queryset(self):
        # Return the chat messages in witch the user is the guest or the host
        return ChatRoom.objects.filter(guest=self.request.user)


# API view for the host to see their messages with the guest(s)
class ChatMessageHostListAPIView(ChatAPIView):
    serializer_class = ChatMessageSerializer
    
    def get_queryset(self):
        # Get the room id from the request
        room_id = self.request.query_params.get('room_id')
        # If the room id is not provided, return an error response
        if not room_id:
            raise ParseError(detail='You must provide a room id as a query parameter', code='error')
            # raise ValueError('You must provide a room id as a query parameter')
        
        # Return the chat messages in witch the user is the guest or the host
        return ChatMessage.objects.filter(chat_room__listing__host=self.request.user, chat_room_id=room_id)


# API view for the guests to see their messages with the host(s)
class ChatMessageGuestListAPIView(ChatAPIView):
    serializer_class = ChatMessageSerializer
    
    def get_queryset(self):
        # Get the room id from the request
        room_id = self.request.query_params.get('room_id')
        # If the room id is not provided, return an error
        if not room_id:
            raise ParseError(detail='You must provide a room id as a query parameter', code='error')
        
        # Return the chat messages in witch the user is the guest or the host
        return ChatMessage.objects.filter(chat_room__guest=self.request.user, chat_room_id=room_id)


# API view to create a new chat room between a guest and a listing (host)
class ChatRoomCreateAPIView(CreateModelMixin, GenericViewSet):
    permission_classes = [IsAuthenticated]
    serializer_class = ChatRoomCreateSerializer
    
    def create(self, request, *args, **kwargs):
        # Add the guest to the request data
        if isinstance(request.data, QueryDict):
            # If the request data is a QueryDict, make it mutable
            request.data._mutable = True
            # Add the guest to the request data
            request.data.update({'guest': request.user.pk})
            # Make the request data immutable again
            request.data._mutable = False
        
        # Validate the serializer
        serializer = self.get_serializer(data=request.data)
        if not serializer.is_valid():
            # If the error is about the uniqueness of the chat room, return a custom error
            if serializer.errors.get('non_field_errors') == ['The fields listing, guest must make a unique set.']:
                # Get the ID of the existing chat room
                chat_room_id = ChatRoom.objects.get(listing=request.data.get('listing'), guest=request.user).pk
                return Response(
                    {
                        'error': 'A chat room with this listing already exists',
                        'chat_room_id': chat_room_id,
                    },
                    status=status.HTTP_409_CONFLICT
                )
            
            return Response(
                serializer.errors,
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Save the request and retrieve the chat room id
        chat_room = serializer.save()
        return Response(
            {"chat_room_id": chat_room.pk},
            status=status.HTTP_201_CREATED
        )
