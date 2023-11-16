from django.utils import timezone
from rest_framework import serializers

from backend.bookings.models import Reservation, Availability


class ReservationSerializer(serializers.ModelSerializer):
    total_price = serializers.DecimalField(max_digits=10, decimal_places=2, read_only=True)
    status = serializers.IntegerField(read_only=True)
    updated_at = serializers.DateTimeField(read_only=True)
    created_at = serializers.DateTimeField(read_only=True)
    
    class Meta:
        model = Reservation
        fields = [
            'listing', 'guest',
            'start_date', 'end_date', 'status', 'total_price',
            'updated_at', 'created_at',
        ]
    
    def create(self, validated_data):
        # Calculate the total price
        listing = validated_data['listing']
        start_date = validated_data['start_date']
        end_date = validated_data['end_date']
        
        # Check if the start date is before the end date
        if start_date > end_date:
            raise serializers.ValidationError("The start date must be before the end date.")
        
        # Check if the start date is in the past
        if start_date < timezone.now().date():
            raise serializers.ValidationError("The start date cannot be in the past.")
        
        # Check if the start date and the end date do not conflict with any existing reservations
        reservations = Reservation.objects.filter(listing=listing)
        for reservation in reservations:
            if start_date <= reservation.end_date and end_date >= reservation.start_date:
                raise serializers.ValidationError("The selected dates conflict with an existing reservation.")
        
        # Check the listing to be within the available dates
        availabilities = Availability.objects.filter(listing=listing)
        for availability in availabilities:
            if start_date >= availability.start_date and end_date <= availability.end_date:
                break
        else:
            raise serializers.ValidationError("The selected dates are not within the available dates.")
        
        # Calculate the total price
        total_price = listing.price * (end_date - start_date).days
        validated_data['total_price'] = total_price
        return super().create(validated_data)


class AvailabilitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Availability
        fields = [
            'start_date', 'end_date',
        ]
