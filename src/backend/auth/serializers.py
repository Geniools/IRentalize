from django.contrib.auth import get_user_model
from djoser.serializers import UserCreateSerializer
from rest_framework import serializers

from backend.api.serializers import AddressSerializer
from backend.users.models import UserProfile

# Will retrieve the User model defined in AUTH_USER_MODEL in settings.py
User = get_user_model()


class CustomUserCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = [
            'first_name', 'last_name', 'email', 'password',
        ]


class UserProfileSerializer(serializers.ModelSerializer):
    default_address = AddressSerializer(allow_null=True)
    profile_picture = serializers.ImageField(read_only=True)
    
    class Meta:
        model = UserProfile
        fields = [
            'about_me', 'phone', 'default_address',
            # Read-only fields
            'profile_picture',
            # Timestamps
            'response_rate', 'response_time',
        ]
    
    def update(self, instance, validated_data):
        # Retrieve the address data from the validated data
        address_data = validated_data.pop('default_address', {})
        # Update the profile
        profile = super().update(instance, validated_data)
        
        # Update the address
        if address_data:
            if profile.default_address:
                address = AddressSerializer(profile.default_address, data=address_data, partial=True)
            else:
                address = AddressSerializer(data=address_data)
            
            # Save the address
            if address.is_valid(raise_exception=True):
                current_address = address.save()
                
                # Attach the address to the profile
                profile.default_address = current_address
                # Save the profile (with the new or updated address)
                profile.save()
        
        return profile


class UserSerializer(serializers.ModelSerializer):
    profile = UserProfileSerializer()
    
    class Meta:
        model = User
        fields = [
            # User fields
            'username', 'first_name', 'last_name', 'email', 'last_login', 'date_joined',
            # Profile fields
            'profile',
        ]
    
    def update(self, instance, validated_data):
        # Retrieve the profile data from the validated data
        profile_data = validated_data.pop('profile', {})
        # Update the user
        user = super().update(instance, validated_data)
        
        # Update the profile
        if profile_data:
            profile = UserProfileSerializer(user.profile, data=profile_data, partial=True)
            # Save the profile
            if profile.is_valid(raise_exception=True):
                profile.save()
        
        return user
