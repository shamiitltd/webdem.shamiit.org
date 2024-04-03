from django.urls import path
from webdem import views

urlpatterns = [
    path('',views.index , name="index"),
    path('layer3/',views.layer3_UI , name="layer3"),
]