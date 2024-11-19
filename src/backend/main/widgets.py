from django.forms import widgets


class ReactJsonEditorWidget(widgets.Widget):
    template_name = "admin/json_editor_widget.html"

    def __init__(self, attrs=None):
        super().__init__(attrs)

    class Media:
        js = ['react-widget/react-widget.js']
