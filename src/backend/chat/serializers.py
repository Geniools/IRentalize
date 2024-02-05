from rest_framework import serializers

from backend.chat.models import ChatMessage, ChatRoom


class ChatRoomCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatRoom
        fields = ('listing', 'guest')
    
    def validate(self, attrs):
        # Check the guest to be different from the host of the listing
        if attrs['guest'] == attrs['listing'].host:
            raise serializers.ValidationError({'error': 'The guest must be different from the host of the listing'})
        
        return attrs


class ChatRoomSerializer(serializers.ModelSerializer):
    listing_title = serializers.CharField(source='listing.title', read_only=True)
    listing_host_name = serializers.CharField(source='listing.host.get_username_or_first_name', read_only=True)
    
    class Meta:
        model = ChatRoom
        fields = ('id', 'listing_title', 'listing_host_name',)


class ChatMessageSerializer(serializers.ModelSerializer):
    sender_name = serializers.CharField(source='sender.get_username_or_first_name', read_only=True)
    sender_type = serializers.SerializerMethodField(read_only=True)
    
    class Meta:
        model = ChatMessage
        fields = (
            'id', 'sender_type',
            'sender_name', 'message',
            'timestamp'
        )
    
    def get_sender_type(self, obj):
        if obj.sender == obj.chat_room.listing.host:
            return 'host'
        elif obj.sender == obj.chat_room.guest:
            return 'guest'
        else:
            raise ValueError('The sender must be the guest or the host of the chat room')
