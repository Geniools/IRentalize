# IRentalize

## Description

IRentalize is a web application that allows users to rent out their items to other users.
The application is closely realted to the popular website Airbnb, but instead of renting out *only* houses, users can
rent out different other items.

## ERD - Entity Relationship Diagram

![ERD](docs/assets/IRentalize_ERD.png)

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/en/)
- [MySQL](https://www.mysql.com/)
- [Python](https://www.python.org/) - version 3.8 or higher
- [pip](https://pip.pypa.io/en/stable/) - should be pre-installed with Python
- *[docker](https://www.docker.com/)* - **optional** - if you want to run the application in a docker container

### Setup

1. Clone the repository
    - `git clone https://github.com/Geniools/IRentalize.git`
2. Install the dependencies
    - `pip install -r requirements.txt`
    - `cd src/frontend` and then `npm install`

### Configuration

1. Create a `local_settings.py` file in the `src/IRentalize` directory and add the following text:

```
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

# Database settings for IRentalize project.
DB_NAME = '' # The name of the database
DB_HOST = '' # The host of the database (localhost or IP address)
DB_PORT = 3306 # The port of the database (default is 3306)
DB_USER = '' # The username of the database (must have access to the database)
DB_PASS = '' # The password of the database user

# Django settings for IRentalize project.
SECRET_KEY = 'a-secure-key'

# When DEBUG is False, in case of a code error, the ADMINS will be notified on their email address.
ADMINS = []
DEBUG = True

# STATIC_ROOT = "D:\\Programming\\Python\\IRentalize\\src\\static"
STATIC_ROOT = ""
MEDIA_ROOT = BASE_DIR / 'media'

# A list of directories where Django looks for static files
STATICFILES_DIRS = [BASE_DIR / 'static']
```

The above variables must be modified according to your own setup.
For more infomration about the Django settings, please visit
the [official documentation](https://docs.djangoproject.com/en/4.2/ref/settings/).

2. Run the following commands to create the database and the tables (inside the `src` directory):

```
python manage.py makemigrations
python manage.py migrate
```

3. Create a superuser account:

```
python manage.py createsuperuser
```

4. Run the following command to start the development server:

```
python manage.py runserver
```

5. Run the following command to start the frontend development server:

```
cd src/frontend 
npm run dev
```

*Note:* For production, run `npm run build` instead of `npm run dev`!

6. Open your browser and go to `http://localhost:8000/`
7. To access the admin panel, go to `http://localhost:8000/admin/`
8. To access the API, go to `http://localhost:8000/api/`