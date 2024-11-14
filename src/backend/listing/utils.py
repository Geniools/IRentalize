import os

from django.core.exceptions import ValidationError


def is_valid_image(image):
    """
    Checks if the given image is a valid image
    """

    # Check for file size
    if image.size > 1024 * 1024 * 20:
        raise ValidationError('Image file too large (> 20 MB).')

    # Check for allowed file extensions
    ext = os.path.splitext(image.name)[1]
    valid_extensions = ['.jpg', '.jpeg', '.png']
    if not ext.lower() in valid_extensions:
        raise ValidationError('Unsupported file extension.')


def is_valid_image_list(images):
    for image in images:
        is_valid_image(image)
