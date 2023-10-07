from django.shortcuts import render


def index(request, *args, **kwargs):
    return render(request, 'frontend/index.html')


def handler404(request, *args, **kwargs):
    return render(request, 'frontend/index.html')
