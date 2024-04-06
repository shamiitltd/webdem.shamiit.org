from django.urls import path
from myapp import views

urlpatterns = [
    path('',views.layer1_UI , name="layer1"),
    path('layer3/',views.layer3_UI , name="layer3"),
  
]