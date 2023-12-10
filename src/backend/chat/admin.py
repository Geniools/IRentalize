from django.contrib import admin

from backend.chat.models import ChatRoom, ChatMessage


@admin.register(ChatRoom)
class ChatRoomAdmin(admin.ModelAdmin):
    list_display = ('id', 'listing', 'guest')
    list_display_links = ('id', 'listing', 'guest')
    list_filter = ('listing', 'guest')
    search_fields = ('listing', 'guest')


@admin.register(ChatMessage)
class ChatMessageAdmin(admin.ModelAdmin):
    list_display = ('id', 'chat_room', 'sender', 'message', 'timestamp', 'is_read')
    list_display_links = ('id', 'chat_room', 'sender')
    list_filter = ('chat_room', 'sender', 'is_read')
    search_fields = ('chat_room', 'sender', 'message')
