from rest_framework import serializers

# Import all the models that will be used in the serializers
from backend.listings.models import Listing, Category, ListingImage


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
    category = serializers.ChoiceField(choices=Category.objects.all())
    # Will retrieve all the images attributed to the listing
    images = ListingImageSerializer(many=True, read_only=True)
    # Will be used when creating or updating a listing
    uploaded_images = serializers.ListField(
        child=serializers.ImageField(max_length=None, allow_empty_file=False, use_url=False),
        write_only=True,
    )
    
    class Meta:
        model = Listing
        fields = [
            'id', 'category', 'host', 'title', 'description', 'price', 'address', 'images', 'uploaded_images'
        ]
    
    def create(self, validated_data):
        print(validated_data)
        uploaded_images = validated_data.pop("uploaded_images")
        listing = Listing.objects.create(**validated_data)
        
        # Create and save the images to the listing
        for image in uploaded_images:
            ListingImage.objects.create(listing=listing, image=image)
        
        return listing


# Contact Us Form
class ContactUsFormSerializer(serializers.Serializer):
    full_name = serializers.CharField(max_length=100)
    email = serializers.EmailField()
    phone_number = serializers.CharField(max_length=20, required=False, allow_blank=True)
    message = serializers.CharField(max_length=500)
    terms_and_conditions = serializers.BooleanField()
    g_recaptcha_response = serializers.CharField()
