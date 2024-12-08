from config.env import env

DATABASES = {
    'default': {
        'ENGINE':   'django.db.backends.mysql',
        'NAME':     env("DJANGO_DB_NAME"),
        'USER':     env("DJANGO_DB_USER"),
        'PASSWORD': env("DJANGO_DB_PASS"),
        'HOST':     env("DJANGO_DB_HOST"),
        'PORT':     env("DJANGO_DB_PORT"),
        'OPTIONS':  {
            'init_command': "SET sql_mode='STRICT_TRANS_TABLES'"
        }
    },
}
