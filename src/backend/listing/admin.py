from django.contrib import admin
from django.utils.safestring import mark_safe
from unfold.admin import ModelAdmin as UnfoldModelAdmin

from backend.listing.admin_utils import ListingImageInLine, ListingAnalyticsInLine
from backend.listing.forms import ListingForm
from backend.listing.models import Category, Listing, ListingAnalytics, ListingImage


@admin.register(Category)
class CategoryAdmin(UnfoldModelAdmin):
    list_display = ('id', 'name', 'icon')
    list_display_links = ('id', 'name')
    search_fields = ('name',)
    readonly_fields = ('display_icon',)

    fieldsets = [
        ('General Information', {
            'fields': ('name', 'icon'),
        }),
        ('Icon', {
            'fields': ('display_icon',),
        }),
    ]

    @admin.display(description='Icon')
    def display_icon(self, obj):
        return mark_safe(f'<img src="{obj.icon.url}" alt="{obj.name}" style="max-width: 100px; max-height: 100px;">')

    display_icon.allow_tags = True
    display_icon.short_description = 'Icon'


@admin.register(Listing)
class ListingAdmin(UnfoldModelAdmin):
    list_display = ('id', 'name', 'category', 'host', 'created_at', 'updated_at')
    list_display_links = ('id', 'name')
    list_filter = ('category', 'host', 'address')
    search_fields = (
        'name', 'content', 'summary', 'price_details', 'contact_details',
        'host__email', 'host__first_name', 'host__last_name',
        'address__street_name', 'address__house_number', 'address__house_addition', 'address__zip_code',
    )
    readonly_fields = ('display_images', 'image_number', 'created_at', 'updated_at',)
    inlines = (ListingImageInLine, ListingAnalyticsInLine,)
    form = ListingForm

    fieldsets = (
        ('General Information', {
            'fields': ('name', 'category', 'host', 'image_number'),
        }),
        ('Address', {
            'fields': ('address',),
        }),
        ('Content', {
            'fields':  ('content', 'summary', 'price_details', 'contact_details'),
            'classes': ('collapse',),
        }),
        ('Images', {
            'fields':  ('display_images',),
            'classes': ('collapse',),
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
        }),
    )

    @admin.display(description='Image number')
    def image_number(self, obj):
        return obj.images.count()

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


@admin.register(ListingAnalytics)
class ListingAnalyticsAdmin(UnfoldModelAdmin):
    list_display = ('id', 'listing', 'views', 'is_visible')
    list_editable = ('is_visible',)
    list_display_links = ('id', 'listing')
    list_filter = ('is_visible',)
    search_fields = (
        'listing__name', 'listing__content', 'listing__summary', 'listing__price_details',
        'listing__contact_details', 'listing__host__email', 'listing__host__first_name', 'listing__host__last_name',
        'views',
    )
    readonly_fields = ('listing', 'views',)

    fieldsets = [
        ('Listing', {
            'fields': ['listing'],
        }),
        ('Analytics', {
            'fields': ['views', 'is_visible'],
        }),
    ]


@admin.register(ListingImage)
class ListingImageAdmin(UnfoldModelAdmin):
    list_display = ('id', 'listing',)
    list_display_links = ('id', 'listing',)
    list_filter = ('listing',)
    search_fields = (
        'listing__name', 'listing__address', 'listing__host__email',
        'listing__host__first_name', 'listing__host__last_name',
    )
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
        ('Timestamps', {
            'fields': [
                'created_at', 'updated_at',
            ],
        })
    ]

    @admin.display(description='Image')
    def display_image(self, obj):
        return mark_safe(f'<img src="{obj.image.url}" alt="{obj.listing.name}" style="min-width: 245px; max-width: 90%">')
