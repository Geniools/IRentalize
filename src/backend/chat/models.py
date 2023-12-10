from django.db import models


class ChatRoom(models.Model):
    listing = models.ForeignKey('listings.Listing', on_delete=models.CASCADE)
    guest = models.ForeignKey('users.User', on_delete=models.CASCADE)
    
    def __str__(self):
        return f'Chat: {self.guest} - {self.listing}'


class ChatMessage(models.Model):
    chat_room = models.ForeignKey('chat.ChatRoom', on_delete=models.CASCADE)
    message = models.TextField()
    sender = models.ForeignKey('users.User', on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)
    
    def clean(self):
        # Check the sender to be the guest or the host of the chat room
        if self.sender != self.chat_room.guest and self.sender != self.chat_room.listing.host:
            raise ValueError('The sender must be the guest or the host of the chat room')
        
        return super().clean()
    
    def __str__(self):
        return f'Message from {self.chat_room}'
