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
        total_price = listing.price * (end_date - start_date).days
        # Create the reservation
        validated_data['total_price'] = total_price
        return super().create(validated_data)


class AvailabilitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Availability
        fields = [
            'start_date', 'end_date',
        ]
