from django.contrib import admin
from django.utils.safestring import mark_safe

from backend.listings.models import Listing, ListingImage, Category, Address


@admin.register(Address)
class AddressAdmin(admin.ModelAdmin):
    list_display = ('id', 'street_name', 'house_number', 'house_addition', 'zip_code', 'latitude', 'longitude')
    list_display_links = ('id', 'street_name', 'house_number', 'house_addition', 'zip_code', 'latitude', 'longitude')
    search_fields = ('street_name', 'house_number', 'house_addition', 'zip_code', 'latitude', 'longitude')
    readonly_fields = ('latitude', 'longitude')
    fieldsets = [
        ('Address', {
            'fields': [
                'street_name', 'house_number', 'house_addition', 'zip_code',
            ],
        }),
        ('Location', {
            'fields': [
                'latitude', 'longitude',
            ],
        }),
    ]


@admin.register(Listing)
class ListingAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'category', 'host', 'image_number', 'price', 'views', 'visible', 'enable_booking', 'created_at', 'updated_at')
    list_display_links = ('id', 'title')
    list_filter = ('category', 'host')
    search_fields = (
        'title', 'description', 'host__email', 'host__first_name', 'host__last_name', 'host__username', 'price',
        'address__street_name', 'address__house_number', 'address__house_addition', 'address__zip_code',
    )
    readonly_fields = ('display_images', 'created_at', 'updated_at', 'views', 'image_number', 'host')
    
    fieldsets = (
        ('General Information', {
            'fields': ('category', 'host', 'title', 'description', 'price', 'views', 'image_number'),
        }),
        ('Address', {
            'fields': ('address',),
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
        }),
        ('Images', {
            'fields': ('display_images',),
            'classes': ('collapse',),
        }),
        ('Other', {
            'fields': ('visible', 'enable_booking'),
        }),
    )
    
    @admin.display(description='Images')
    def display_images(self, obj):
        images_html = ""
        for image in obj.images.all():
            images_html += f'''
                <div style="flex: 1; margin: 5px;">
                    <img src="{image.image.url}" alt="Related listing image" style="width: 100%; height: 100%; min-width: 245px; object-fit: cover;">
                </div>
            '''
        return mark_safe(f'<div style="display: flex; flex-wrap: wrap;">{images_html}</div>')
    
    display_images.allow_tags = True
    display_images.short_description = 'Images'
    
    @admin.display(description='Image number')
    def image_number(self, obj):
        return obj.images.count()


@admin.register(ListingImage)
class ListingImageAdmin(admin.ModelAdmin):
    list_display = ('id', 'listing',)
    list_display_links = ('id', 'listing',)
    list_filter = ('listing',)
    search_fields = ('listing__title', 'listing__description', 'listing__address', 'listing__host__email', 'listing__host__first_name', 'listing__host__last_name', 'listing__host__username')
    readonly_fields = ('display_image',)
    fieldsets = [
        ('Listing', {
            'fields': [
                'listing', 'image'
            ],
        }),
        ('Image', {
            'fields': ['display_image'],
        }),
    ]
    
    @admin.display(description='Image')
    def display_image(self, obj):
        return mark_safe(f'<img src="{obj.image.url}" alt="{obj.listing.title}" style="min-width: 245px; max-width: 90%">')


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'name',)
    list_display_links = ('id', 'name',)
    ordering = ('id',)
    search_fields = ('name',)
