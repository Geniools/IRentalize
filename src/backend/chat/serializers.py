from rest_framework import serializers

from backend.chat.models import ChatMessage, ChatRoom


class ChatRoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatRoom
        fields = ('id', 'listing', 'guest')


class ChatMessageSerializer(serializers.ModelSerializer):
    sender_name = serializers.CharField(source='sender.get_username_or_first_name', read_only=True)
    
    class Meta:
        model = ChatMessage
        fields = ('id', 'sender_name', 'message', 'timestamp', 'chat_room')
