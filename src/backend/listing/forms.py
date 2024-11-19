from django import forms

from backend.listing.models import Listing
from backend.main.widgets import ReactJsonEditorWidget


class ListingForm(forms.ModelForm):
    class Meta:
        model = Listing
        fields = '__all__'
        widgets = {
            'content':         ReactJsonEditorWidget(),
            'summary':         ReactJsonEditorWidget(),
            'price_details':   ReactJsonEditorWidget(),
            'contact_details': ReactJsonEditorWidget(),
        }
