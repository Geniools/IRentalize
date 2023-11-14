from rest_framework import serializers

from backend.listings.models import Address


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


# Contact Us Form
class ContactUsFormSerializer(serializers.Serializer):
    full_name = serializers.CharField(max_length=100)
    email = serializers.EmailField()
    phone_number = serializers.CharField(max_length=20, required=False, allow_blank=True)
    message = serializers.CharField(max_length=500)
    terms_and_conditions = serializers.BooleanField()
    g_recaptcha_response = serializers.CharField()
