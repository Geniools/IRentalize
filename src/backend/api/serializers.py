from rest_framework import serializers

from backend.api.utils import is_valid_image_list
# Import all the models that will be used in the serializers
from backend.listings.models import Listing, Category, ListingImage, Address


# Listings
class ListingImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ListingImage
        fields = '__all__'


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


class ListingSerializer(serializers.ModelSerializer):
    category = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all())
    # Will retrieve all the images attributed to the listing
    images = ListingImageSerializer(many=True, read_only=True)
    # Will be used when creating or updating a listing
    uploaded_images = serializers.ListField(
        child=serializers.ImageField(max_length=None, allow_empty_file=False, use_url=False),
        write_only=True,
        validators=[is_valid_image_list],
    )
    # Host details
    host_username = serializers.CharField(source='host.username', read_only=True)
    host_first_name = serializers.CharField(source='host.first_name', read_only=True)
    
    # TODO: Add host profile picture and "about me"
    
    class Meta:
        model = Listing
        fields = [
            # Listing details/info
            'id', 'category', 'title', 'description', 'price', 'images', 'uploaded_images',
            # Host
            'host_username', 'host_first_name',
            # Address
            'street', 'house_number', 'house_addition', 'zip_code',
            # Location coordinates
            'latitude', 'longitude',
            # Timestamps
            'created_at', 'updated_at',
            # Other
            'views',
        ]
    
    def create(self, validated_data):
        # Retrieve the uploaded images from the validated data
        uploaded_images = validated_data.pop("uploaded_images", ())
        # Create the listing
        listing = Listing.objects.create(**validated_data)
        
        # Create and save the images to the listing
        for image in uploaded_images:
            ListingImage.objects.create(listing=listing, image=image)
        
        return listing
    
    def update(self, instance, validated_data):
        # Retrieve the uploaded images from the validated data
        uploaded_images = validated_data.pop("uploaded_images", ())
        # Update the listing
        listing = super().update(instance, validated_data)
        
        # Create and save the images to the listing
        for image in uploaded_images:
            ListingImage.objects.create(listing=listing, image=image)
        
        return listing


# Address serializer
class UserAddressSerializer(serializers.ModelSerializer):
    latitude = serializers.FloatField(read_only=True)
    longitude = serializers.FloatField(read_only=True)
    
    class Meta:
        model = Address
        fields = [
            'street_name', 'house_number', 'house_addition', 'zip_code',
            'latitude', 'longitude',
        ]


# Contact Us Form
class ContactUsFormSerializer(serializers.Serializer):
    full_name = serializers.CharField(max_length=100)
    email = serializers.EmailField()
    phone_number = serializers.CharField(max_length=20, required=False, allow_blank=True)
    message = serializers.CharField(max_length=500)
    terms_and_conditions = serializers.BooleanField()
    g_recaptcha_response = serializers.CharField()
