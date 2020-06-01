from django.shortcuts import render


# Create your views here.
def systems(request):
    return render(request, "systems.html", {})
