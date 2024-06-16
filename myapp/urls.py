from django.urls import path
from myapp import views

urlpatterns = [
    path('',views.index , name="index"),
    path('layer1/',views.layer1_UI , name="layer1"),
    path('layer2/',views.layer2_UI , name="layer2"),
    path('layer3/',views.layer3_UI , name="layer3"),
    path('testing/',views.testing , name="testing"),
    
]