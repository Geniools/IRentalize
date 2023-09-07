from django.db import models
from django.utils.html import format_html


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
    address = models.CharField(max_length=255)
    
    class Meta:
        db_table = 'listing'
        verbose_name = 'Listing'
        verbose_name_plural = 'Listings'
        ordering = ['-id']
    
    def __str__(self):
        return self.title
    
    def display_images(self):
        images_html = ''
        for image in self.images.all():
            images_html += f'<img src="{image.image.url}" alt="{self.title}" class="img-fluid">'
        
        return format_html(images_html)


class ListingImage(models.Model):
    id = models.AutoField(primary_key=True)
    listing = models.ForeignKey(Listing, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='listings')
    
    class Meta:
        db_table = 'listing_image'
        verbose_name = 'Listing Image'
        verbose_name_plural = 'Listing Images'
        ordering = ['id']
    
    def __str__(self):
        return self.listing.title
