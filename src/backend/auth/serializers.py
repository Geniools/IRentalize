from django.contrib.auth import get_user_model, authenticate
from djoser.serializers import UserCreateSerializer
from rest_framework import serializers

# Will retrieve the User model defined in AUTH_USER_MODEL in settings.py
User = get_user_model()


class CustomUserCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = [
            'id', 'username', 'password', 'email', 'phone', 'first_name', 'last_name'
        ]


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField(
        label='Email',
    )
    password = serializers.CharField(
        style={'input_type': 'password'},
        label='Password',
        trim_whitespace=False,
    )
    remember_me = serializers.BooleanField(
        label='Remember me',
        default=False,
    )
    
    def validate(self, attrs):
        # TODO: Integrate the remember_me field
        
        # .get() returns None if the key doesn't exist
        email = attrs.get('email').strip().lower()
        password = attrs.get('password')
        
        # Make sure both fields have been sent to the backend
        if not email or not password:
            raise serializers.ValidationError('Both the "email" and the "password" are required.')
        
        # Authenticate the user
        user = authenticate(
            request=self.context.get('request'),
            username=attrs['email'],
            password=attrs['password']
        )
        
        # Make sure the user exists and is active
        if not user or not user.is_active:
            raise serializers.ValidationError('Incorrect credentials')
        
        attrs['user'] = user
        return attrs
    
    class Meta:
        fields = ['email', 'password']
