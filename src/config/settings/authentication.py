# DJOSER = {
#     'LOGIN_FIELD':                         'email',
#     'PASSWORD_RESET_CONFIRM_URL':          'password-reset/confirm/{uid}/{token}',
#     'USERNAME_RESET_CONFIRM_URL':          'username-reset/confirm/{uid}/{token}',
#     'ACTIVATION_URL':                      'activate/{uid}/{token}',
#     'SEND_ACTIVATION_EMAIL':               True,
#     'SEND_CONFIRMATION_EMAIL':             True,
#     'PASSWORD_CHANGED_EMAIL_CONFIRMATION': True,
#     'USERNAME_CHANGED_EMAIL_CONFIRMATION': True,
#     'PASSWORD_RESET_CONFIRM_RETYPE':       True,
#     'USERNAME_RESET_CONFIRM_RETYPE':       True,
#     'TOKEN_MODEL':                         None,
#     'SERIALIZERS':                         {
#         'user_create':  'backend.auth.serializers.CustomUserCreateSerializer',
#         'user':         'backend.auth.serializers.UserSerializer',
#         'current_user': 'backend.auth.serializers.UserSerializer',
#         'user_delete':  'djoser.serializers.UserCreateSerializer',
#     },
# }

# SIMPLE_JWT = {
#     "ACCESS_TOKEN_LIFETIME":    timedelta(minutes=5),
#     "REFRESH_TOKEN_LIFETIME":   timedelta(days=1),
#     'AUTH_HEADER_TYPES':        ('JWT',),
#     'ROTATE_REFRESH_TOKENS':    True,
#     'BLACKLIST_AFTER_ROTATION': True,
#     'UPDATE_LAST_LOGIN':        True,
# }
