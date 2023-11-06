import phonenumbers
from django.core.exceptions import ValidationError


def is_valid_number(phone_number):
    try:
        parsed_phone_number = phonenumbers.parse(phone_number, "NL")
        if not phonenumbers.is_valid_number(parsed_phone_number):
            raise ValidationError("Invalid phone number")
    except phonenumbers.phonenumberutil.NumberParseException as ex:
        raise ValidationError("Invalid phone number")
    except Exception as ex:
        raise ValidationError("Invalid phone number")
