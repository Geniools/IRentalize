from django.core.exceptions import ValidationError
from rest_framework import serializers

from backend.bookings.models import Reservation, Availability
from backend.listings.models import Listing
from backend.users.models import User


class ReservationStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reservation
        fields = [
            'id', 'status',
        ]


class ReservationSerializer(serializers.ModelSerializer):
    listing = serializers.PrimaryKeyRelatedField(write_only=True, queryset=Listing.objects.all())
    listing_name = serializers.CharField(source='listing.title', read_only=True)
    listing_id = serializers.IntegerField(source='listing.id', read_only=True)
    
    guest = serializers.PrimaryKeyRelatedField(write_only=True, queryset=User.objects.all())
    guest_name = serializers.CharField(source='guest.username', read_only=True)
    
    total_price = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)
    status = serializers.IntegerField(read_only=True)
    is_paid = serializers.BooleanField(read_only=True)
    
    updated_at = serializers.DateTimeField(read_only=True)
    created_at = serializers.DateTimeField(read_only=True)
    
    class Meta:
        model = Reservation
        fields = [
            'id',
            'guest', 'guest_name',
            'listing', 'listing_id', 'listing_name',
            'start_date', 'end_date', 'status', 'is_paid', 'total_price',
            'updated_at', 'created_at',
        ]
    
    def create(self, validated_data):
        # Calculate the total price
        listing = validated_data['listing']
        start_date = validated_data['start_date']
        end_date = validated_data['end_date']
        
        try:
            Reservation.validate_all(listing, start_date, end_date)
        except ValidationError as e:
            raise serializers.ValidationError({"error": e})
        
        return super().create(validated_data)


class AvailabilitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Availability
        fields = [
            'id', 'listing', 'start_date', 'end_date',
        ]
    
    def create(self, validated_data):
        # Validate the dates
        start_date = validated_data['start_date']
        end_date = validated_data['end_date']
        listing = validated_data['listing']
        
        try:
            Availability.validate_all(listing, start_date, end_date)
        except ValidationError as e:
            raise serializers.ValidationError({"error": e})
        
        return super().create(validated_data)
