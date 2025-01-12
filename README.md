# IRentalize

## Description

IRentalize is a web application targeting students. The main goal of IRentalize is to offer students the possibility
of finding housing and moving easier.

The application is divided into two main parts: the frontend and the backend. The frontend is a single-page application
built with React, while the backend is a Django application. The frontend communicates with the backend through a REST
API.

An example of an ERD for the database can be found in the [docs/assets](./docs/assets) folder.

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/en/)
- [MySQL](https://www.mysql.com/)
- [Python](https://www.python.org/) - version 3.8 or higher
- [pip](https://pip.pypa.io/en/stable/) - should be pre-installed with Python

### Setup

- Install the dependencies

```bash
pip install -r requirements.txt
```

- Create a `.env` file in the `IRentalize/src` folder. Use the `.env.example` file as a template.
- Create a `.env` file in the `IRentalize/src/frontend` folder. Use the `.env.example` file as a template.

- Run the migrations

```bash
python manage.py migrate
```

- Create a superuser account:

```
python manage.py createsuperuser
```

Then follow the instructions in the terminal.

- Create a set of pre-defined categories:

```
python manage.py createcategories
```

- Run the following command to start the frontend development server:

```
cd src/frontend 
npm run dev
```

*Note:* For production, run `npm run build` instead!

- Run the backend server:

```bash
python manage.py runserver
```

## Usage

- The application runs at `http://localhost:8000/`
- The admin panel can be accessed at `http://localhost:8000/admin/`
- The API can be accessed at `http://localhost:8000/api/`

*Note:* The port can be changed when running the backend server.

TODO: Add a docker-compose file for easier setup.