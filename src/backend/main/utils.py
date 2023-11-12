import os
from operator import attrgetter

from django.utils.crypto import get_random_string
from django.utils.deconstruct import deconstructible
from django.utils.text import slugify


@deconstructible
class UploadToPathAndRename(object):
    def __init__(self, path, title_as_attr):
        self.sub_path = path
        self.title_as_attr = title_as_attr
        self.attr_getter = attrgetter(title_as_attr)
    
    def __call__(self, instance, filename):
        title = self.attr_getter(instance)
        # Check if the instance has a title attribute
        if title is None or len(title) == 0:
            raise ValueError(f"Instance has no value for '{self.title_as_attr}'")
        
        # Get the extension of the file
        ext = filename.split('.')[-1]
        # Create a "safe" filename, e.g., using the slug of the title and a random string
        filename = '{}_{}.{}'.format(slugify(title), get_random_string(6), ext)
        # Return the whole path to the file
        return os.path.join(self.sub_path, filename)
