from rest_framework import serializers

from backend.address.serializers import OutputAddressSerializer
from backend.listing.models import Listing, Category, ListingImage


class OutputCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['name', 'icon']


class OutputListingImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ListingImage
        fields = ['image']


class OutputListingSerializer(serializers.ModelSerializer):
    images = OutputListingImageSerializer(many=True)
    category = OutputCategorySerializer()
    address = OutputAddressSerializer()

    class Meta:
        model = Listing
        # fields = '__all__'
        # TODO: Add 'host' field
        exclude = ['host']
