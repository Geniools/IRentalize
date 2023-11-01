import phonenumbers


def is_valid_number(phone_number):
    try:
        parsed_phone_number = phonenumbers.parse(phone_number)
        return phonenumbers.is_valid_number(parsed_phone_number)
    except phonenumbers.phonenumberutil.NumberParseException:
        return False
