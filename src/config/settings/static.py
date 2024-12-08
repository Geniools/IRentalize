from config import BASE_DIR
from config.env import env

# Static files (CSS, JavaScript, Images)
STATIC_ROOT = env("DJANGO_STATIC_ROOT")
STATIC_URL = 'static/'

# Media files
MEDIA_ROOT = env("DJANGO_MEDIA_ROOT")
MEDIA_URL = 'media/'

# A list of directories where Django looks for static files
STATICFILES_DIRS = [
    BASE_DIR / 'frontend/static',
    BASE_DIR / 'frontend/static/react-widget/static'
]
