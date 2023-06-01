from django.http import HttpResponse
from django.shortcuts import render


def index(request):
    # TODO: Add a template for this view
    return HttpResponse('Hello, world. You are at the IRentalize index.')
