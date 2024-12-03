from django.db import models
from django_cleanup import cleanup

from backend.listing.utils import is_valid_image
from backend.main.models import BaseModel
from backend.main.utils import UploadToPathAndRename


@cleanup.select
class Category(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=50, unique=True)
    icon = models.ImageField(upload_to=UploadToPathAndRename('icons', 'name'), blank=True, null=True)

    class Meta:
        db_table = 'category'
        verbose_name = 'Category'
        verbose_name_plural = 'Categories'
        ordering = ['name']

    def __str__(self):
        return self.name


class Listing(BaseModel):
    id = models.AutoField(primary_key=True)
    category = models.ForeignKey(Category, on_delete=models.PROTECT, related_name='listings')
    host = models.ForeignKey('user.User', on_delete=models.PROTECT, related_name='listings', null=True, blank=True)
    address = models.ForeignKey('address.Address', on_delete=models.PROTECT, related_name='listings', null=True, blank=True)

    name = models.CharField(max_length=250)

    content = models.JSONField(null=True, blank=True, help_text='This field is used to display the main content of the listing.')
    summary = models.JSONField(null=True, blank=True, help_text='This field should be a summary of the listing. It is used on the listing card.')
    price_details = models.JSONField(null=True, blank=True)
    contact_details = models.JSONField(null=True, blank=True)

    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)

    class Meta:
        db_table = 'listing'
        verbose_name = 'Listing'
        verbose_name_plural = 'Listings'
        ordering = ['created_at', 'updated_at']

    def __str__(self):
        return self.name


class ListingAnalytics(models.Model):
    id = models.AutoField(primary_key=True)
    listing = models.OneToOneField(Listing, on_delete=models.CASCADE, related_name='analytics')
    views = models.PositiveIntegerField(null=True, blank=True)
    is_visible = models.BooleanField(default=True, help_text='If this is checked, the listing will be visible on the website.')

    class Meta:
        db_table = 'listing_analytics'
        verbose_name = 'Listing Analytics'
        verbose_name_plural = 'Listing Analytics'
        ordering = ['views', 'is_visible']

    def __str__(self):
        return self.listing


@cleanup.select  # https://github.com/un1t/django-cleanup
class ListingImage(BaseModel):
    id = models.AutoField(primary_key=True)
    listing = models.ForeignKey(Listing, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to=UploadToPathAndRename('listing', 'listing.name'), validators=[is_valid_image])

    class Meta:
        db_table = 'listing_image'
        verbose_name = 'Listing Image'
        verbose_name_plural = 'Listing Images'
        ordering = ['id']

    def __str__(self):
        return self.listing.name
