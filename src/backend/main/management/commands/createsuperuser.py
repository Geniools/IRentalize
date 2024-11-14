from django.core.management import BaseCommand

from backend.user.models import User


class Command(BaseCommand):
    help = 'Create a superuser for the website if one does not already exist.'

    def handle(self, *args, **options):
        if User.objects.filter(is_superuser=True).exists():
            self.stdout.write(self.style.WARNING('A superuser already exists.'))
            return

        try:
            User.objects.create_superuser()
        except Exception as e:
            self.stdout.write(self.style.ERROR('Failed to create default user.'))
            self.stdout.write(self.style.ERROR(e))
            return

        self.stdout.write(self.style.SUCCESS('Successfully created default user.'))
        # Print a warning message that this should only be used as a test user
        self.stdout.write(self.style.WARNING('Please change the default user password as soon as possible.'))
