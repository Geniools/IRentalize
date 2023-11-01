import requests

from django.conf import settings


def get_client_ip(request):
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0]
    else:
        ip = request.META.get('REMOTE_ADDR')
    return ip


def is_valid_captcha(request, captcha):
    # Validate the captcha
    captcha_response = requests.post(
        'https://www.google.com/recaptcha/api/siteverify',
        data={
            'response': captcha,
            'secret': settings.GOOGLE_RECAPTCHA_SECRET_KEY,
            'remote_ip': get_client_ip(request),
        }
    )
    
    return captcha_response.json()['success']
