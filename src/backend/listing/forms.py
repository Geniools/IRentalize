from django import forms

from backend.listing.models import Listing
from backend.main.widgets import BlockNoteJSWidget


class ListingForm(forms.ModelForm):
    class Meta:
        model = Listing
        fields = '__all__'
        widgets = {
            'content':         BlockNoteJSWidget(),
            'summary':         BlockNoteJSWidget(),
            'price_details':   BlockNoteJSWidget(),
            'contact_details': BlockNoteJSWidget(),
        }
