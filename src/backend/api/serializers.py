from django.contrib.auth import authenticate
from rest_framework import serializers

# Import all the models that will be used in the serializers
from backend.listings.models import Listing, ListingImage, Category
from backend.users.models import User


# Listings
class ListingImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ListingImage
        fields = ['image']


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = [
            'name', 'icon',
        ]


class ListingSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    images = ListingImageSerializer(many=True, read_only=True)
    
    class Meta:
        model = Listing
        fields = [
            'id', 'category', 'title', 'description', 'price', 'address', 'images',
        ]


# Users
class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        style={'input_type': 'password'},
        label='Password',
        write_only=True
    )
    
    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            password=validated_data['password'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            email=validated_data['email'],
            phone=validated_data['phone'],
            address=validated_data['address'],
        )
        return user
    
    class Meta:
        model = User
        fields = [
            'username', 'password', 'email', 'phone', 'first_name', 'last_name', 'address'
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
    
    def validate(self, attrs):
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
