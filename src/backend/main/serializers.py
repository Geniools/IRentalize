import requests
from django.conf import settings
from rest_framework import serializers

from backend.main.models import ContactUs


# TODO: Make a base serializer for reCAPTCHA verification, honeypot field, and rate limiting

class InputContactUsSerializer(serializers.ModelSerializer):
    honeypot = serializers.CharField(required=False, allow_blank=True)
    recaptcha_token = serializers.CharField(write_only=True)

    class Meta:
        model = ContactUs
        fields = '__all__'

    def validate(self, data):
        # Check honeypot field
        honeypot = data.pop('honeypot', None)
        if honeypot:
            raise serializers.ValidationError("Bot submission detected")

        # Verify reCAPTCHA
        token = data.pop('recaptcha_token', None)
        if not token:
            raise serializers.ValidationError({"recaptcha_token": "reCAPTCHA verification required"})

        recaptcha_response = requests.post(
            'https://www.google.com/recaptcha/api/siteverify',
            data={
                'secret':   settings.RECAPTCHA_PRIVATE_KEY,
                'response': token
            }
        )

        if not recaptcha_response.json().get('success'):
            raise serializers.ValidationError({"recaptcha_token": "reCAPTCHA verification failed"})

        # Rate limiting
        # If behind a NAT, the IP address will be the same for all users
        # ip = self.context['request'].META.get('REMOTE_ADDR')
        # cache_key = f'contact_form_{ip}'
        # submission_count = cache.get(cache_key, 0)
        #
        # if submission_count >= 5:  # Max 5 submissions per hour
        #     raise serializers.ValidationError("Too many submissions. Please try again later.")
        #
        # cache.set(cache_key, submission_count + 1, 3600)  # 1 hour expiry

        return super().validate(data)
