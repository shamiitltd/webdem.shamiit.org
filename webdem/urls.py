from django.urls import path
from webdem import views

urlpatterns = [
    path('',views.index , name="index"),
    path('/layer1',views.layer1 , name="layer1")
]