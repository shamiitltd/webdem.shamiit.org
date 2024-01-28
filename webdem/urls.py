from django.urls import path
from webdem import views

urlpatterns = [
    path('',views.index , name="index"),
]