from rest_framework import serializers

from backend.users.models import UserProfile


class UserProfileImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['profile_picture']
