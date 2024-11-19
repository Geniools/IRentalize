from unfold.admin import StackedInline as UnfoldStackedInline

from backend.listing.models import ListingImage, ListingAnalytics


class ListingImageInLine(UnfoldStackedInline):
    model = ListingImage
    verbose_name_plural = 'Images'
    readonly_fields = ['id', ]
    empty_value_display = '-'

    fieldsets = (
        ('Listing Image', {
            'fields': (
                'image',
            ),
        }),
    )


class ListingAnalyticsInLine(UnfoldStackedInline):
    model = ListingAnalytics
    hide_title = True
    can_delete = False
    verbose_name_plural = 'Analytics'
    readonly_fields = ('id', 'views')
    empty_value_display = '-'

    fieldsets = (
        ('Listing Analytics', {
            'fields': (
                'views', 'is_visible',
            ),
        }),
    )
