from django.urls import path
from webdem import views
from .views import *
urlpatterns = [
    path('',views.index , name="index"),
     path('get-students',getStudent),
    path('post-student',postStudent),
    path('put-student',putStudent),
]
