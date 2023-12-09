from django.contrib import admin

from backend.bookings.models import Reservation, Availability


@admin.register(Reservation)
class ReservationAdmin(admin.ModelAdmin):
    list_display = ('id', 'listing', 'guest', 'start_date', 'end_date', 'status', 'is_paid',)
    list_filter = ('status', 'listing', 'guest', 'is_paid',)
    search_fields = ('id', 'listing', 'guest', 'start_date', 'end_date', 'status', 'total_price', 'is_paid',)
    list_display_links = ('id', 'listing', 'guest')
    readonly_fields = ('updated_at', 'created_at', 'total_price',)
    
    fieldsets = (
        ('General Information', {
            'fields': ('listing', 'guest', 'start_date', 'end_date', 'status', 'is_paid', 'discount', 'total_price',),
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at',),
        }),
    )


@admin.register(Availability)
class AvailabilityAdmin(admin.ModelAdmin):
    list_display = ('id', 'listing', 'start_date', 'end_date',)
    list_filter = ('listing',)
    search_fields = ('id', 'listing', 'start_date', 'end_date',)
    list_display_links = ('id', 'listing',)
    
    fieldsets = (
        ('General Information', {
            'fields': ('listing', 'start_date', 'end_date',),
        }),
    )
