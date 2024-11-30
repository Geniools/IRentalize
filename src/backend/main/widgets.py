from django.forms import widgets
from django.templatetags.static import static
from django.utils.html import format_html


class ReactJsonEditorWidget(widgets.Widget):
    template_name = "admin/json_editor_widget.html"

    def __init__(self, attrs=None):
        super().__init__(attrs)

    def get_context(self, name, value, attrs):
        context = super().get_context(name, value, attrs)
        context['widget']['attrs']['data-react-props'] = {
            'name':  name,
            'value': str(value) or '[]',
        }
        return context

    class Media:
        js = [format_html(
            '<script type="module" src="{}"></script>',
            static('react-widget/react-widget.js'),
        )]
