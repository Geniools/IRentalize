from .base import *  # noqa

DEBUG = env("DJANGO_DEBUG", default=False)
SECRET_KEY = env("DJANGO_SECRET_KEY")

ALLOWED_HOSTS = env("ALLOWED_HOSTS", default=[])

CSRF_COOKIE_SECURE = env("DJANGO_CSRF_COOKIE_SECURE", default=True)
SESSION_COOKIE_SECURE = env("DJANGO_SESSION_COOKIE_SECURE", default=True)
