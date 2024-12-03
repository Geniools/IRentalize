from rest_framework import serializers

from backend.address.models import Address, Location


class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = ['city', 'country']


class OutputAddressSerializer(serializers.ModelSerializer):
    location = LocationSerializer()

    class Meta:
        model = Address
        fields = [
            'name', 'street_name', 'number', 'number_addition',
            'zip_code', 'province',
            'location',
            'latitude', 'longitude',
        ]
