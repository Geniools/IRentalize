from django.core.exceptions import ValidationError
from django.utils import timezone


def validate_booking_dates(start_date, end_date):
    # Check if the start date is before the end date
    if start_date > end_date:
        raise ValidationError("The start date must be before the end date.")
    
    # Check if the start date is in the past
    if start_date < timezone.now().date():
        raise ValidationError("The start date cannot be in the past.")
