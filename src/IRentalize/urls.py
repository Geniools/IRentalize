from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('auth/', include('backend.auth.urls')),
    path('grappelli/', include('grappelli.urls')),
    path('', include('frontend.urls')),
    path('api/', include('backend.api.urls')),
]

handler404 = 'frontend.views.handler404'

# In order to serve media files in development, we need to add the following to the project's urls.py file:
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
