import json

from asgiref.sync import sync_to_async
from channels.generic.websocket import AsyncWebsocketConsumer
from django.utils.text import slugify

from backend.chat.models import ChatRoom, ChatMessage


class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.user = self.scope["user"]
        # If the user is not authenticated, close the connection
        if self.user.is_anonymous:
            await self.close()
        else:
            self.room_id = self.scope["url_route"]["kwargs"]["room_id"]
            # Create a room group name
            self.room_group_name = slugify(f"chat_{self.room_id}_{self.user.first_name}")
            self.chat_room = await self.get_chat_room()
            
            await self.channel_layer.group_add(self.room_group_name, self.channel_name)
            await self.accept()
    
    async def disconnect(self, code):
        # If the user is not authenticated, there is no "room group name" (throwing an error)
        if self.user.is_anonymous:
            return
        
        # Leave room
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )
    
    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json["message"]
        
        await self.save_chat_message(message)
        
        sender_name = self.user.username if self.user.username else self.user.first_name
        
        await self.channel_layer.group_send(
            self.room_group_name, {
                "type": "chat_message",
                "message": message,
                "sender": sender_name
            }
        )
    
    async def chat_message(self, event):
        message = event["message"]
        sender = event["sender"]
        await self.send(
            text_data=json.dumps(
                {
                    "message": message,
                    "sender_name": sender,
                }
            )
        )
    
    @sync_to_async
    def get_chat_room(self):
        if not ChatRoom.objects.filter(pk=self.room_id).exists():
            raise ValueError("The chat room doesn't exist")
        
        return ChatRoom.objects.get(pk=self.room_id)
    
    @sync_to_async
    def save_chat_message(self, message):
        chat_message = ChatMessage(chat_room=self.chat_room, sender=self.user, message=message)
        chat_message.full_clean()
        return chat_message.save()
