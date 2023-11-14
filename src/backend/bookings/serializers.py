from rest_framework import serializers

from backend.bookings.models import Reservation, Availability


class ReservationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reservation
        fields = [
            'listing', 'guest',
            'start_date', 'end_date', 'status', 'total_price',
            'updated_at', 'created_at',
        ]


class AvailabilitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Availability
        fields = [
            'start_date', 'end_date',
        ]
