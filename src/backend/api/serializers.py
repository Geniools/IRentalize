from rest_framework import serializers

from backend.api.utils import is_valid_image_list
# Import all the models that will be used in the serializers
from backend.listings.models import Listing, Category, ListingImage, Address
from backend.listings.utils import is_valid_dutch_zip_code


# Listings
class ListingImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ListingImage
        fields = '__all__'


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


# Address serializer
class AddressSerializer(serializers.ModelSerializer):
    latitude = serializers.FloatField(read_only=True)
    longitude = serializers.FloatField(read_only=True)
    
    class Meta:
        model = Address
        fields = [
            'street_name', 'house_number', 'house_addition', 'zip_code',
            'latitude', 'longitude',
        ]


class ListingSerializer(serializers.ModelSerializer):
    category = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all())
    category_name = serializers.CharField(source='category.name', read_only=True)
    # Overwrite timestamps to only return the date
    created_at = serializers.DateTimeField(format="%Y-%m-%d", read_only=True)
    updated_at = serializers.DateTimeField(format="%Y-%m-%d", read_only=True)
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
    host_about_me = serializers.CharField(source='host.profile.about_me', read_only=True)
    host_profile_picture = serializers.ImageField(source='host.profile.profile_picture', read_only=True)
    host_member_since = serializers.DateTimeField(source='host.date_joined', read_only=True, format="%Y-%m-%d")
    host_response_rate = serializers.DecimalField(source='host.profile.response_rate', read_only=True, max_digits=5, decimal_places=2)
    host_response_time = serializers.CharField(source='host.profile.response_time', read_only=True)
    # Address details (read-only)
    address = AddressSerializer(read_only=True)
    # Address details (write-only)
    street_name = serializers.CharField(write_only=True)
    house_number = serializers.IntegerField(write_only=True)
    house_addition = serializers.CharField(write_only=True, allow_blank=True, required=False)
    zip_code = serializers.CharField(write_only=True, validators=[is_valid_dutch_zip_code])
    
    class Meta:
        model = Listing
        fields = [
            # Listing details/info
            'id', 'category', 'category_name', 'title', 'description', 'price', 'images', 'uploaded_images',
            # Host
            'host', 'host_username', 'host_first_name', 'host_about_me', 'host_profile_picture', 'host_member_since', 'host_response_rate', 'host_response_time',
            # Address (read-only)
            'address',
            # Address (write-only)
            'street_name', 'house_number', 'house_addition', 'zip_code',
            # Timestamps
            'created_at', 'updated_at',
            # Other
            'views',
        ]
    
    def create(self, validated_data):
        # Retrieve the uploaded images from the validated data
        uploaded_images = validated_data.pop("uploaded_images", ())
        # Retrieve the address data from the validated data
        street_name = validated_data.pop('street_name')
        house_number = validated_data.pop('house_number')
        house_addition = validated_data.pop('house_addition', None)
        zip_code = validated_data.pop('zip_code')
        # Create the address and attach it to the listing
        address = Address.objects.create(street_name=street_name, house_number=house_number, house_addition=house_addition, zip_code=zip_code)
        validated_data['address'] = address
        # Create the listing
        listing = Listing.objects.create(**validated_data)
        
        # Create and save the images to the listing
        for image in uploaded_images:
            ListingImage.objects.create(listing=listing, image=image)
        
        return listing
    
    def update(self, instance, validated_data):
        # Retrieve the uploaded images from the validated data
        uploaded_images = validated_data.pop("uploaded_images", ())
        # Retrieve the address data from the validated data
        street_name = validated_data.pop('street_name')
        house_number = validated_data.pop('house_number')
        house_addition = validated_data.pop('house_addition', None)
        zip_code = validated_data.pop('zip_code')
        # Update the address
        address_data = {
            'street_name': street_name,
            'house_number': house_number,
            'house_addition': house_addition,
            'zip_code': zip_code,
        }
        address_serializer = AddressSerializer(instance.address, data=address_data, partial=True)
        if address_serializer.is_valid(raise_exception=True):
            # Update the listing
            listing = super().update(instance, validated_data)
            # Save the address
            address_serializer.save()
        
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
