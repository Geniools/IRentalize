from django.core.exceptions import ValidationError
from django.db import models

from backend.bookings.constants import RESERVATION_STATUS
from backend.bookings.utils import validate_booking_dates


class Reservation(models.Model):
    id = models.AutoField(primary_key=True)
    listing = models.ForeignKey('listings.Listing', on_delete=models.CASCADE, related_name='reservations')
    guest = models.ForeignKey('users.User', on_delete=models.CASCADE, related_name='reservations')
    start_date = models.DateField()
    end_date = models.DateField()
    status = models.SmallIntegerField(choices=RESERVATION_STATUS, default=0)
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    discount = models.DecimalField(max_digits=10, decimal_places=2, default=0, help_text='Discount in percentage')
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
    
    def save(self, force_insert=False, force_update=False, using=None, update_fields=None):
        # Calculate the total price
        price_per_day = self.listing.price
        start_date = self.start_date
        end_date = self.end_date
        
        total_days = (end_date - start_date).days
        if total_days < 0:
            raise ValueError("End date cannot be earlier than start date")
        
        total_price = price_per_day * total_days
        self.total_price = total_price - (total_price * self.discount / 100)
        
        return super().save(force_insert, force_update, using, update_fields)
    
    def clean(self):
        Reservation.validate_all(self.listing, self.start_date, self.end_date)
        return super().clean()
    
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


class Availability(models.Model):
    id = models.AutoField(primary_key=True)
    listing = models.ForeignKey('listings.Listing', on_delete=models.CASCADE, related_name='availabilities')
    start_date = models.DateField()
    end_date = models.DateField()
    
    class Meta:
        db_table = 'availability'
        verbose_name = 'Availability'
        verbose_name_plural = 'Availabilities'
        ordering = ['start_date']
    
    def __str__(self):
        return f'{self.listing} - {self.start_date} - {self.end_date}'
    
    def clean(self):
        Availability.validate_all(self.listing, self.start_date, self.end_date)
        return super().clean()
    
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
