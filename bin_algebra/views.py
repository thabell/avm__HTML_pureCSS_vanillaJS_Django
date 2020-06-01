from django.shortcuts import render


# Create your views here.
def logic(request):
    return render(request, "logic.html", {})
