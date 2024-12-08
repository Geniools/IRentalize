# DRF (Django REST Framework) settings
REST_FRAMEWORK = {
    'DEFAULT_THROTTLE_CLASSES':   [
        'rest_framework.throttling.ScopedRateThrottle',
    ],
    'DEFAULT_THROTTLE_RATES':     {
        'request': '50/min',
    },
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated',
    ],
    # 'DEFAULT_AUTHENTICATION_CLASSES': [
    #     'rest_framework_simplejwt.authentication.JWTAuthentication',
    # ],
    'DEFAULT_FILTER_BACKENDS':    [
        'django_filters.rest_framework.DjangoFilterBackend',
    ],
    'DEFAULT_PAGINATION_CLASS':   'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE':                  10,
}
