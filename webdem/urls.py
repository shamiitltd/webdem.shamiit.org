from django.urls import path
from . import views

urlpatterns = [
    path('layer1/',views.layer1_UI , name="layer1"),
    path('layer3/',views.layer3_UI , name="layer3"),
  
]