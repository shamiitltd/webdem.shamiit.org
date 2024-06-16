from django.shortcuts import render

# Create your views here.
def index(request):
    return render(request, 'index.html')

def layer1_UI(request):
    return render(request, 'layer1.html')

def layer2_UI(request):
    return render(request, 'layer2.html')

def layer3_UI(request):
    return render(request, 'layer3.html')

def testing(request):
    return render(request, 'testing.html')