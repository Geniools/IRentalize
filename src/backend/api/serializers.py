from rest_framework import serializers

# Import all the models that will be used in the serializers
from backend.bookings.models import Reservation, Availability
from backend.listings.models import Listing, ListingImage, Category
from backend.users.models import User


# Create a serializer for each model

# Bookings
class ReservationSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Reservation
        fields = [
            'id', 'listing', 'guest', 'start_date', 'end_date', 'total_price',
        ]


class AvailabilitySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Availability
        fields = [
            'id', 'listing', 'start_date', 'end_date',
        ]


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


# Listings
class ListingSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    images = ListingImageSerializer(many=True, read_only=True)
    
    class Meta:
        model = Listing
        fields = [
            'id', 'category', 'title', 'description', 'price', 'address', 'images',
        ]


# Users
class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = [
            'id', 'username', 'email', 'phone', 'first_name', 'last_name', 'date_joined', 'last_login',
        ]
