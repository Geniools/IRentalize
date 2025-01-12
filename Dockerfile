# TODO: Test the dockerfile

# Backend
FROM python:3.8-slim as backend
LABEL authors="Alex"

WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy the application code
COPY . .

# Collect static files
RUN python manage.py collectstatic --noinput

# Frontend
FROM node:14 as frontend

WORKDIR /app

# Install dependencies
COPY src/frontend/package*.json ./
RUN npm install

# Build the frontend
COPY src/frontend .
RUN npm run build

# Final stage
FROM python:3.8-slim

WORKDIR /app

# Copy backend and frontend build
COPY --from=backend /app /app
COPY --from=frontend /app/dist /app/static

# Expose the port
EXPOSE 8000

# Run the application
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "IRentalize.wsgi:application"]