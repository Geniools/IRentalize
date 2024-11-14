from django.core.exceptions import ValidationError
from django.db import models

from backend.booking.constants import RESERVATION_STATUS, MESSAGE_STATUS
from backend.booking.utils import validate_booking_dates
from backend.main.utils import UploadToPathAndRename


class Reservation(models.Model):
    id = models.AutoField(primary_key=True)
    # Entities involved
    listing = models.ForeignKey('listing.Listing', on_delete=models.CASCADE, related_name='reservations')
    guest = models.ForeignKey('user.User', on_delete=models.CASCADE, related_name='reservations')
    # Reservation status
    status = models.SmallIntegerField(choices=RESERVATION_STATUS, default=0)
    contract = models.CharField(max_length=255, null=True, blank=True)
    # Reservation time period
    start_date_time = models.DateTimeField()
    end_date_time = models.DateTimeField(null=True, blank=True)
    # Timestamps
    updated_at = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'reservation'
        verbose_name = 'Reservation'
        verbose_name_plural = 'Reservations'
        ordering = ['-created_at']

    def __str__(self):
        return f'{self.guest} - {self.listing}'

    @staticmethod
    def validate_reservation_conflicts(listing, start_date, end_date):
        # Check if the start date and the end date do not conflict with any existing reservations
        reservations = Reservation.objects.filter(listing=listing.id)
        for reservation in reservations:
            if start_date <= reservation.end_date and end_date >= reservation.start_date:
                raise ValidationError("The selected dates conflict with an existing reservation.")

        # Check the listing to be within the available dates
        availabilities = Availability.objects.filter(listing=listing.id)
        for availability in availabilities:
            if start_date >= availability.start_date and end_date <= availability.end_date:
                break
        else:
            raise ValidationError("The selected dates are not within the available dates.")

    @staticmethod
    def validate_all(listing, start_date, end_date):
        validate_booking_dates(start_date, end_date)
        Reservation.validate_reservation_conflicts(listing, start_date, end_date)


class ReservationComment(models.Model):
    id = models.AutoField(primary_key=True)
    reservation = models.ForeignKey(Reservation, on_delete=models.CASCADE, related_name='comments')
    content = models.TextField(null=True, blank=True)
    picture = models.ImageField(upload_to=UploadToPathAndRename('reservation_comments', 'reservation.guest'), null=True, blank=True)
    status = models.SmallIntegerField(choices=MESSAGE_STATUS, default=0)
    # Timestamps
    updated_at = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'reservation_comment'
        verbose_name = 'Reservation Comment'
        verbose_name_plural = 'Reservation Comments'
        ordering = ['-created_at']

    def __str__(self):
        return f'{self.reservation} - {self.status}'


class Availability(models.Model):
    id = models.AutoField(primary_key=True)
    listing = models.ForeignKey('listing.Listing', on_delete=models.CASCADE, related_name='availabilities')
    start_date_time = models.DateTimeField()
    end_date_time = models.DateTimeField(null=True, blank=True)

    class Meta:
        db_table = 'availability'
        verbose_name = 'Availability'
        verbose_name_plural = 'Availabilities'
        ordering = ['start_date_time']

    def __str__(self):
        return f'{self.listing} - {self.start_date_time} - {self.end_date_time if self.end_date_time else "Indefinite"}'

    @staticmethod
    def validate_conflicts(listing, start_date, end_date):
        # Check if the start date and the end date are not in conflict with any existing availabilities
        availabilities = Availability.objects.filter(listing=listing.id)
        for availability in availabilities:
            if start_date <= availability.end_date and end_date >= availability.start_date:
                raise ValidationError("The selected dates conflict with an existing availability.")

    @staticmethod
    def validate_all(listing, start_date, end_date):
        validate_booking_dates(start_date, end_date)
        Availability.validate_conflicts(listing, start_date, end_date)
