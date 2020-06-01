from django.shortcuts import render


# Create your views here.
def about(request):
    return render(request, "about.html", {})


def index(request):
    return render(request, "index.html", {})


def map_(request):
    return render(request, "map.html", {})


def user(request):
    return render(request, "user.html", {})
