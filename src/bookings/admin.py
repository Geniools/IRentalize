from django.contrib import admin

from bookings.models import Reservation, Availability


@admin.register(Reservation)
class ReservationAdmin(admin.ModelAdmin):
    pass


@admin.register(Availability)
class AvailabilityAdmin(admin.ModelAdmin):
    pass
