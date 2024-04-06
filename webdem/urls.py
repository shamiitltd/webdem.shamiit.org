from django.urls import path
from webdem import views
import views
from django.contrib import admin
from django.urls import path
urlpatterns = [
    path('',views.index , name="index"),
    path("student/",views.studentapi.as_view()),
    path("get/",views.studentapi.as_view()),
    path("post/",views.studentapi.as_view()),
    path("delete/",views.studentapi.as_view()),
   
]







# from django.conf.urls import url

urlpatterns = [

    

]