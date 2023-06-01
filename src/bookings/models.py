from django.db import models


class Reservation(models.Model):
    id = models.AutoField(primary_key=True)
    listing = models.ForeignKey('listings.Listing', on_delete=models.CASCADE)
    guest = models.ForeignKey('users.User', on_delete=models.CASCADE)
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    updated_at = models.DateTimeField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        db_table = 'reservation'
        verbose_name = 'Reservation'
        verbose_name_plural = 'Reservations'
        ordering = ['-created_at']
    
    def __str__(self):
        return f'{self.guest} - {self.listing}'


class Availability(models.Model):
    id = models.AutoField(primary_key=True)
    listing = models.ForeignKey('listings.Listing', on_delete=models.CASCADE)
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    
    class Meta:
        db_table = 'availability'
        verbose_name = 'Availability'
        verbose_name_plural = 'Availabilities'
        ordering = ['start_date']
    
    def __str__(self):
        return f'{self.listing} - {self.start_date} - {self.end_date}'
