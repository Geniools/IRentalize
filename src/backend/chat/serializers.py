from rest_framework import serializers

from backend.chat.models import ChatMessage, ChatRoom


class ChatRoomSerializer(serializers.ModelSerializer):
    listing_title = serializers.CharField(source='listing.title', read_only=True)
    listing_host_name = serializers.CharField(source='listing.host.get_username_or_first_name', read_only=True)
    
    class Meta:
        model = ChatRoom
        fields = ('id', 'listing_title', 'listing_host_name',)


class ChatMessageSerializer(serializers.ModelSerializer):
    sender_name = serializers.CharField(source='sender.get_username_or_first_name', read_only=True)
    
    class Meta:
        model = ChatMessage
        fields = ('id', 'sender_name', 'message', 'timestamp')
