from django.core.validators import MinValueValidator
from django.db import models

from backend.main.models import BaseModel


class Location(BaseModel):
    id = models.AutoField(primary_key=True)
    city = models.CharField(max_length=250)
    country = models.CharField(max_length=250)

    class Meta:
        db_table = 'location'
        verbose_name = 'Location'
        verbose_name_plural = 'Locations'
        ordering = ['city', 'country']

    def __str__(self):
        return f"{self.city}, {self.country}"


class Address(BaseModel):
    id = models.AutoField(primary_key=True)
    location = models.ForeignKey(Location, on_delete=models.PROTECT, related_name='addresses')
    # Address details
    street_name = models.CharField(max_length=255, null=True, blank=True)
    number = models.IntegerField(validators=[MinValueValidator(1)], null=True, blank=True)
    number_addition = models.CharField(max_length=10, blank=True, null=True)
    zip_code = models.CharField(max_length=50, null=True, blank=True)
    province = models.CharField(max_length=250, null=True, blank=True)
    name = models.CharField(max_length=255, null=True, blank=True)
    # Location coordinates
    latitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    longitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)

    class Meta:
        db_table = 'address'
        verbose_name = 'Address'
        verbose_name_plural = 'Addresses'
        ordering = ['street_name', 'number', 'number_addition', 'zip_code', 'name']

    def __str__(self):
        result = self.street_name if self.street_name else ""
        result += f" {self.number}" if self.number else ""
        result += self.number_addition if self.number_addition else ""
        result += f", {self.zip_code}" if self.zip_code else ""
        result += f" {self.name}" if self.name else ""
        return result

    def save(self, *args, **kwargs):
        # Remove the spaces from the zip code
        self.zip_code = self.zip_code.replace(" ", "")
        # Set the location coordinates
        # self.latitude, self.longitude = get_location_location_coordinates(self.street_name, self.number, self.number_addition, self.zip_code)
        # Do the default model save()
        super().save(*args, **kwargs)
