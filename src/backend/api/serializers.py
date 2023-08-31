from rest_framework import serializers

# Import all the models that will be used in the serializers
from backend.listings.models import Listing, ListingImage, Category


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


# Contact Us Form
class ContactUsFormSerializer(serializers.Serializer):
    full_name = serializers.CharField(max_length=100)
    email = serializers.EmailField()
    phone_number = serializers.CharField(max_length=20)
    message = serializers.CharField(max_length=500)
    terms_and_conditions = serializers.BooleanField()
