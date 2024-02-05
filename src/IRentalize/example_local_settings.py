"""
If unsure about some settings, refer to the Django documentation:
https://docs.djangoproject.com/en/5.0/ref/settings/
# Check the Django deployment checklist:
https://docs.djangoproject.com/en/5.0/howto/deployment/checklist/
"""
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

# Default Database settings for IRentalize-student project.
DB_NAME = 'your-database-name'
DB_HOST = 'example.com'
DB_PORT = 3306
DB_USER = 'your-username'
DB_PASS = 'your-password'

# Security settings for IRentalize project.
# The settings below should be set to True in production. This enforces the use of HTTPS for cookies and sessions.
CSRF_COOKIE_SECURE = False
SESSION_COOKIE_SECURE = False

# Email settings for IRentalize project.
EMAIL_HOST = "smtp.gmail.com"  # Gmail SMTP server
EMAIL_PORT = 587
EMAIL_USE_TLS = True

# ! For gmail you have to configure "App Password" and use it as EMAIL_HOST_PASSWORD
EMAIL_HOST_USER = "some-email@example.com"
EMAIL_HOST_PASSWORD = "some-password"
DEFAULT_FROM_EMAIL = "some-email@example.com"

# Change the secret key to a secure string of characters
SECRET_KEY = 'secret-key-here'

# Change the allowed hosts to the domain name of your website
ALLOWED_HOSTS = ['example.com', 'www.example.com']
CORS_ALLOWED_ORIGINS = ['https://www.example.com', ]

# Set DEBUG to False in production
DEBUG = True

# When DEBUG is False, in case of a code error, the ADMINS and MANAGERS will be notified on their email address.
ADMINS = []
MANAGERS = []

# The root directory of the static files
STATIC_ROOT = ""
# The root directory of the media files
MEDIA_ROOT = BASE_DIR / 'media'

# A list of directories where Django looks for static files
STATICFILES_DIRS = [BASE_DIR / 'frontend/static']

# The secret key for the Google reCAPTCHA API
GOOGLE_RECAPTCHA_SECRET_KEY = 'secret-key-here'
