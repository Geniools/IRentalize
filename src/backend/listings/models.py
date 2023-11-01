from django.core.validators import MinValueValidator
from django.db import models

from backend.listings.utils import is_valid_dutch_zip_code, UploadToPathAndRename, is_valid_image, get_location_location_coordinates


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
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='listings')
    host = models.ForeignKey('users.User', on_delete=models.CASCADE, related_name='listings')
    title = models.CharField(max_length=50)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    # Address
    street = models.CharField(max_length=50)
    house_number = models.IntegerField(validators=[MinValueValidator(1)])
    house_addition = models.CharField(max_length=10, blank=True, null=True)
    zip_code = models.CharField(max_length=10, validators=[is_valid_dutch_zip_code])
    # Location coordinates
    latitude = models.DecimalField(max_digits=9, decimal_places=6)
    longitude = models.DecimalField(max_digits=9, decimal_places=6)
    # Keep track of the number of times a listing has been viewed
    views = models.IntegerField(default=0)
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'listing'
        verbose_name = 'Listing'
        verbose_name_plural = 'Listings'
        ordering = ['-id']
    
    def __str__(self):
        return self.title
    
    def clean(self):
        # Set the location coordinates
        self.latitude, self.longitude = get_location_location_coordinates(self.street, self.house_number, self.house_addition, self.zip_code)
        # Do the default model validation
        super().clean()


class ListingImage(models.Model):
    id = models.AutoField(primary_key=True)
    listing = models.ForeignKey(Listing, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to=UploadToPathAndRename('listings'), validators=[is_valid_image])
    
    class Meta:
        db_table = 'listing_image'
        verbose_name = 'Listing Image'
        verbose_name_plural = 'Listing Images'
        ordering = ['id']
    
    def __str__(self):
        return self.listing.title
