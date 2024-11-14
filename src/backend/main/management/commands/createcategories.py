from django.core.management import BaseCommand

from backend.listing.models import Category


class Command(BaseCommand):
    help = 'Create the default list of categories used on the website.'
    categories = [
        'Electronics',
        'Accessories',
        'Housing',
        'Furniture',
        'Clothing',
        'Books',
        'Other'
    ]

    def handle(self, *args, **options):
        for category in self.categories:
            try:
                Category.objects.create(name=category)
            except Exception as e:
                self.stdout.write(self.style.ERROR(f'Failed to create default category {category}.'))
                self.stdout.write(self.style.ERROR(e))
                return

            self.stdout.write(self.style.SUCCESS(f'Successfully created default categories: \n > {self.categories} <'))
