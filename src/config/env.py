import environ

from config import BASE_DIR

# Path to the .env file
ENV_PATH = BASE_DIR / ".env"

env = environ.Env(
    DJANGO_DEBUG=(bool, False),
    DJANGO_SECRET_KEY=(str, ""),
    DJANGO_ALLOWED_HOSTS=(list, []),
    DJANGO_CORS_ALLOWED_ORIGINS=(list, []),
    DJANGO_ADMINS=(list, []),
    DJANGO_MANAGERS=(list, []),
)

# Load the environmental variables
env.read_env(ENV_PATH)
