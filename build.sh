#!/usr/bin/env bash

set -o errexit  # exit on error

pip install -r requirements.txt

mkdir  staticfiles media
python manage.py collectstatic --no-input
python manage.py makemigrations
python manage.py migrate

DJANGO_SUPERUSER_USERNAME=Grupo24 \
DJANGO_SUPERUSER_PASSWORD=fullgrupo24 \
DJANGO_SUPERUSER_EMAIL="fullstackgrupo24@gmail.com" \
python manage.py createsuperuser --noinput
