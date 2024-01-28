from django.core.validators import MinValueValidator
from django.db import models

from backend.listings.utils import is_valid_dutch_zip_code, is_valid_image, get_location_location_coordinates
from backend.main.utils import UploadToPathAndRename


class Address(models.Model):
    id = models.AutoField(primary_key=True)
    street_name = models.CharField(max_length=50)
    house_number = models.IntegerField(validators=[MinValueValidator(1)])
    house_addition = models.CharField(max_length=10, blank=True, null=True)
    zip_code = models.CharField(max_length=10, validators=[is_valid_dutch_zip_code])
    # Location coordinates
    latitude = models.DecimalField(max_digits=9, decimal_places=6)
    longitude = models.DecimalField(max_digits=9, decimal_places=6)
    
    def __str__(self):
        home_addition_str = f" {self.house_addition}" if self.house_addition else ""
        return f"{self.street_name} {self.house_number}{home_addition_str}, {self.zip_code}"
    
    def save(self, *args, **kwargs):
        # Remove the spaces from the zip code
        self.zip_code = self.zip_code.replace(" ", "")
        # Set the location coordinates
        self.latitude, self.longitude = get_location_location_coordinates(self.street_name, self.house_number, self.house_addition, self.zip_code)
        # Do the default model save()
        super().save(*args, **kwargs)


class Category(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50, unique=True)
    icon = models.ImageField(upload_to='icons', blank=True, null=True)
    
    class Meta:
        db_table = 'category'
        verbose_name = 'Category'
        verbose_name_plural = 'Categories'
        ordering = ['name']
    
    def __str__(self):
        return self.name


class Listing(models.Model):
    id = models.AutoField(primary_key=True)
    # Listing details/info
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='listings')
    host = models.ForeignKey('users.User', on_delete=models.CASCADE, related_name='listings')
    title = models.CharField(max_length=50)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    # Address
    address = models.ForeignKey(Address, on_delete=models.PROTECT, related_name='listing', null=True, blank=True)
    # Keep track of the number of times a listing has been viewed
    views = models.IntegerField(default=0, help_text='This is the number of times this listing has been viewed.')
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    # Other
    visible = models.BooleanField(default=True, help_text='If this is checked, the listing will be visible on the website.')
    
    class Meta:
        db_table = 'listing'
        verbose_name = 'Listing'
        verbose_name_plural = 'Listings'
        ordering = ['-id']
    
    def __str__(self):
        return self.title
    
    def save(self, *args, **kwargs):
        # If the listing is being created
        if not self.pk:
            # If the listing doesn't have an address, but the host has a default address
            if not self.address and self.host.profile.default_address:
                # Set the address to the host's default address
                self.address = self.host.profile.default_address
        
        # Do the default model save()
        super().save(*args, **kwargs)


# TODO: Delete the listing images when the listing is deleted
class ListingImage(models.Model):
    id = models.AutoField(primary_key=True)
    listing = models.ForeignKey(Listing, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to=UploadToPathAndRename('listings', 'listing.title'), validators=[is_valid_image])
    
    class Meta:
        db_table = 'listing_image'
        verbose_name = 'Listing Image'
        verbose_name_plural = 'Listing Images'
        ordering = ['id']
    
    def __str__(self):
        return self.listing.title
