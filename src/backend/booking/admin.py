from django.contrib import admin
from unfold.admin import ModelAdmin as UnfoldModelAdmin

from backend.booking.models import Reservation, ReservationComment, Availability


@admin.register(Reservation)
class ReservationAdmin(UnfoldModelAdmin):
    list_display = ('id', 'listing', 'guest', 'status', 'start_date_time', 'end_date_time')
    list_filter = ('status', 'listing', 'guest')
    search_fields = ('id', 'listing', 'guest', 'status', 'start_date_time', 'end_date_time',)
    list_display_links = ('id', 'listing', 'guest')
    readonly_fields = ('updated_at', 'created_at')

    fieldsets = (
        ('General Information', {
            'fields': ('listing', 'guest', 'status'),
        }),
        ('Reservation Time Period', {
            'fields': ('start_date_time', 'end_date_time'),
        }),
        ('Contract', {
            'fields': ('contract',),
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at',),
        }),
    )


@admin.register(ReservationComment)
class ReservationCommentAdmin(admin.ModelAdmin):
    list_display = ('id', 'reservation', 'content', 'status',)
    list_filter = ('status', 'reservation',)
    search_fields = ('id', 'reservation', 'content', 'status',)
    list_display_links = ('id', 'reservation',)
    readonly_fields = ('created_at', 'updated_at')

    fieldsets = (
        ('General Information', {
            'fields': ('reservation', 'content', 'picture', 'status',),
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at',),
        }),
    )


@admin.register(Availability)
class AvailabilityAdmin(UnfoldModelAdmin):
    list_display = ('id', 'listing', 'start_date_time', 'end_date_time',)
    list_filter = ('listing',)
    search_fields = ('id', 'listing', 'start_date_time', 'end_date_time',)
    list_display_links = ('id', 'listing',)

    fieldsets = (
        ('General Information', {
            'fields': ('listing', 'start_date_time', 'end_date_time',),
        }),
    )