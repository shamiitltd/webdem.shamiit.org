from django.shortcuts import render

# Create your views here.
def layer1_UI(request):
    return render(request, 'layer1.html')

def layer3_UI(request):
    return render(request, 'layer3_UI.html')