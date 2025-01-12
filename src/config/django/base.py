from config import BASE_DIR
from config.env import env

# Based on https://github.com/HackSoftware/Django-Styleguide?tab=readme-ov-file#settings


# General settings
SECRET_KEY = env("DJANGO_SECRET_KEY")

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = env("DJANGO_DEBUG")
# Hosts/domain names that are valid for this site (example.com, www.example.com)
ALLOWED_HOSTS = env("DJANGO_ALLOWED_HOSTS")

ADMINS = env("DJANGO_ADMINS")
MANAGERS = env("DJANGO_MANAGERS")

LOCAL_APPS = [
    'backend.booking.apps.BookingsConfig',
    'backend.listing.apps.ListingsConfig',
    'backend.address.apps.AddressConfig',
    'backend.main.apps.MainConfig',
    'backend.payment.apps.PaymentsConfig',
    'backend.review.apps.ReviewsConfig',
    'backend.user.apps.UsersConfig',
    'frontend.apps.FrontendConfig',
]

THIRD_PARTY_APPS = [
    'django_recaptcha',  # Integration with Google reCAPTCHA
    'django_vite',  # Integration with ViteJS
    'django_filters',
    'django_cleanup.apps.CleanupSelectedConfig',
    'rest_framework',
    'djoser',
    # 'rest_framework_simplejwt',
    # 'rest_framework_simplejwt.token_blacklist',
]

INSTALLED_APPS = [
    "unfold",  # UI Admin panel, has to be before the Django admin
    # Django apps
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    *LOCAL_APPS,
    *THIRD_PARTY_APPS,
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'config.urls'

TEMPLATES = [
    {
        'BACKEND':  'django.template.backends.django.DjangoTemplates',
        'DIRS':     [BASE_DIR / 'frontend/templates'],
        'APP_DIRS': True,
        'OPTIONS':  {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'config.wsgi.application'
ASGI_APPLICATION = 'config.asgi.application'

# Password validation
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# Internationalization
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'Europe/Amsterdam'
USE_I18N = True
USE_TZ = True

# Default primary key field type
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
# Model used to represent a User
AUTH_USER_MODEL = 'user.User'

# Define the session cookie age in seconds
SESSION_COOKIE_AGE = 60 * 60 * 24  # 1 day

CSRF_COOKIE_SECURE = env("DJANGO_CSRF_COOKIE_SECURE")
SESSION_COOKIE_SECURE = env("DJANGO_SESSION_COOKIE_SECURE")

# Import the rest of the settings
from config.settings import *  # noqa
