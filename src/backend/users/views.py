from rest_framework import generics, status
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from backend.users.models import UserProfile
from backend.users.serializers import UserProfileImageSerializer


# API endpoint to update and delete the user profile image
class UserProfileImageUpdateAPI(generics.UpdateAPIView, generics.DestroyAPIView):
    permission_classes = [IsAuthenticated]
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileImageSerializer
    parser_classes = [MultiPartParser, FormParser]
    pagination_class = None
    
    def get_object(self):
        return self.request.user.profile
    
    def delete(self, request, *args, **kwargs):
        # Get the user profile
        profile = self.get_object()
        # Delete the profile image
        profile.profile_picture.delete()
        # Return a response
        return Response(status=status.HTTP_204_NO_CONTENT)
