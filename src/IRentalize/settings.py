import os
from datetime import timedelta
from pathlib import Path

from dotenv import load_dotenv, find_dotenv

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# Path to the .env file
ENV_PATH = BASE_DIR / ".env"
# Load the environmental variables
load_dotenv(ENV_PATH)
# Define a split keyword for environmental variables that need to be converted to a list
_list_split_key = " "

SECRET_KEY = os.getenv("SECRET_KEY")

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = os.getenv("DEBUG", False)

# Hosts/domain names that are valid for this site (example.com, www.example.com)
ALLOWED_HOSTS = os.getenv("ALLOWED_HOSTS").split(_list_split_key)
CORS_ALLOWED_ORIGINS = os.getenv("CORS_ALLOWED_ORIGINS").split(_list_split_key)

# Admins will be notified on their email address in case of a code error.
ADMINS = os.getenv("ADMINS").split(_list_split_key)
MANAGERS = os.getenv("MANAGERS").split(_list_split_key)

# Security settings
CSRF_TRUSTED_ORIGINS = []
CSRF_COOKIE_SECURE = os.getenv("CSRF_COOKIE_SECURE")
SESSION_COOKIE_SECURE = os.getenv("SESSION_COOKIE_SECURE")

INSTALLED_APPS = [
    # Integration with ViteJS
    'django_vite',
    # Channels -> asynchronous support (Channels)
    'daphne',
    # Django apps
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    # Project apps
    'backend.bookings.apps.BookingsConfig',
    'backend.listings.apps.ListingsConfig',
    'backend.main.apps.MainConfig',
    'backend.payments.apps.PaymentsConfig',
    'backend.reviews.apps.ReviewsConfig',
    'backend.users.apps.UsersConfig',
    'backend.chat.apps.ChatConfig',
    'frontend.apps.FrontendConfig',
    # Project apps (outside the scope of the real project)
    'backend.student_finance.apps.StudentFinanceConfig',
    # Third party apps
    'django_filters',
    'grappelli',
    'rest_framework',
    'djoser',
    'rest_framework_simplejwt',
    'rest_framework_simplejwt.token_blacklist',
    # For allowing cross-origin requests (student.irentalize.nl <-> irentalize.nl)
    'corsheaders',
    # For authentication in Channels
    'channels_auth_token_middlewares',
]

# DRF (Django REST Framework) settings
REST_FRAMEWORK = {
    'DEFAULT_THROTTLE_CLASSES':       [
        'rest_framework.throttling.ScopedRateThrottle',
    ],
    'DEFAULT_THROTTLE_RATES':         {
        'request': '50/hour',
    },
    'DEFAULT_PERMISSION_CLASSES':     [
        'rest_framework.permissions.DjangoModelPermissionsOrAnonReadOnly',
        'rest_framework.permissions.IsAuthenticated',
    ],
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ],
    'DEFAULT_FILTER_BACKENDS':        [
        'django_filters.rest_framework.DjangoFilterBackend',
    ],
    'DEFAULT_PAGINATION_CLASS':       'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE':                      10,
}

# 3rd party app for managing user accounts
DJOSER = {
    'LOGIN_FIELD':                         'email',
    'PASSWORD_RESET_CONFIRM_URL':          'password-reset/confirm/{uid}/{token}',
    'USERNAME_RESET_CONFIRM_URL':          'username-reset/confirm/{uid}/{token}',
    'ACTIVATION_URL':                      'activate/{uid}/{token}',
    'SEND_ACTIVATION_EMAIL':               True,
    'SEND_CONFIRMATION_EMAIL':             True,
    'PASSWORD_CHANGED_EMAIL_CONFIRMATION': True,
    'USERNAME_CHANGED_EMAIL_CONFIRMATION': True,
    'PASSWORD_RESET_CONFIRM_RETYPE':       True,
    'USERNAME_RESET_CONFIRM_RETYPE':       True,
    'TOKEN_MODEL':                         None,
    'SERIALIZERS':                         {
        'user_create':  'backend.auth.serializers.CustomUserCreateSerializer',
        'user':         'backend.auth.serializers.UserSerializer',
        'current_user': 'backend.auth.serializers.UserSerializer',
        'user_delete':  'djoser.serializers.UserCreateSerializer',
    },
}

SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME":    timedelta(minutes=5),
    "REFRESH_TOKEN_LIFETIME":   timedelta(days=1),
    'AUTH_HEADER_TYPES':        ('JWT',),
    'ROTATE_REFRESH_TOKENS':    True,
    'BLACKLIST_AFTER_ROTATION': True,
    'UPDATE_LAST_LOGIN':        True,
}

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'IRentalize.urls'

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

WSGI_APPLICATION = 'IRentalize.wsgi.application'
ASGI_APPLICATION = 'IRentalize.asgi.application'

# Database
DATABASES = {
    'default': {
        'ENGINE':   'django.db.backends.mysql',
        'NAME':     os.getenv("DB_NAME"),
        'USER':     os.getenv("DB_USER"),
        'PASSWORD': os.getenv("DB_PASS"),
        'HOST':     os.getenv("DB_HOST"),
        'PORT':     os.getenv("DB_PORT"),
        'OPTIONS':  {
            'init_command': "SET sql_mode='STRICT_TRANS_TABLES'"
        }
    },
}

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

# Channels settings
CHANNEL_LAYERS = {
    "default": {
        "BACKEND": "channels.layers.InMemoryChannelLayer"
    }
}

# Email settings
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = os.getenv("EMAIL_HOST")
EMAIL_PORT = os.getenv("EMAIL_PORT")
EMAIL_HOST_USER = os.getenv("EMAIL_HOST_USER")
EMAIL_HOST_PASSWORD = os.getenv("EMAIL_HOST_PASSWORD")
DEFAULT_FROM_EMAIL = os.getenv("DEFAULT_FROM_EMAIL")
EMAIL_USE_TLS = os.getenv("EMAIL_USE_TLS")
EMAIL_TIMEOUT = 5

# Internationalization
# https://docs.djangoproject.com/en/4.2/topics/i18n/

LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'Europe/Amsterdam'
USE_I18N = True
USE_TZ = True

# Static files (CSS, JavaScript, Images)
STATIC_ROOT = os.getenv("STATIC_ROOT")
STATIC_URL = 'static/'

# Media files
MEDIA_ROOT = os.getenv("MEDIA_ROOT")
MEDIA_URL = 'media/'

# A list of directories where Django looks for static files
STATICFILES_DIRS = [BASE_DIR / 'frontend/static']

# Default primary key field type
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
# Model used to represent a User
AUTH_USER_MODEL = 'users.User'

# Define the session cookie age in seconds
SESSION_COOKIE_AGE = 60 * 60 * 24  # 1 day

# Google reCAPTCHA v2 settings
GOOGLE_RECAPTCHA_SECRET_KEY = os.getenv("GOOGLE_RECAPTCHA_SECRET_KEY")
# Google Maps API key
GOOGLE_MAPS_API_KEY = os.getenv("GOOGLE_MAPS_API_KEY")

# Vite config
DJANGO_VITE_DEV_MODE = DEBUG
DJANGO_VITE_DEV_SERVER_HOST = "localhost"
