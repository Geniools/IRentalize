# Generated by Django 5.1 on 2024-11-14 20:49

import backend.user.utils
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='ContactUs',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('first_name', models.CharField(blank=True, max_length=250, null=True)),
                ('middle_name', models.CharField(blank=True, max_length=250, null=True)),
                ('last_name', models.CharField(blank=True, max_length=250, null=True)),
                ('email', models.EmailField(max_length=254)),
                ('message', models.TextField()),
                ('phone', models.CharField(blank=True, help_text='An non Dutch phone number must contain the country code with the "+" sign.', max_length=15, null=True, validators=[backend.user.utils.is_valid_number])),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
            options={
                'verbose_name': 'Contact Us',
                'verbose_name_plural': 'Contact Us',
                'db_table': 'contact_us',
                'ordering': ['-created_at'],
            },
        ),
    ]