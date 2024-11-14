import re

import googlemaps
from django.conf import settings
from django.core.exceptions import ValidationError


def get_location_location_coordinates(street, house_number, house_addition, zip_code):
    """
    Retrieves the location coordinates of the given address
    """

    # Create an instance of the Google Maps API client
    gmaps = googlemaps.Client(key=settings.GOOGLE_MAPS_API_KEY)

    # Get the location coordinates of the given address
    geocode_result = gmaps.geocode(f'{street} {house_number}{f" {house_addition}" if house_addition else ""}, {zip_code}')
    # print(geocode_result)

    # Check if the address was found
    if not geocode_result:
        raise ValidationError('Address not found')

    # Get the location coordinates
    location_coordinates = geocode_result[0]['geometry']['location']
    # print(location_coordinates)

    return location_coordinates['lat'], location_coordinates['lng']


def is_valid_dutch_zip_code(zip_code):
    """
    Checks if the given zip code is a valid Dutch zip code
    """

    if not bool(re.match("^[1-9][0-9]{3} ?(?!sa|sd|ss)[a-zA-Z]{2}$", zip_code)):
        raise ValidationError('Invalid Dutch zip code')
