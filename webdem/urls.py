from django.urls import path
from webdem import views

urlpatterns = [
    path('',views.index , name="index"),
    # Login page URL
    path('login_page/', views.login_page, name='login_page'), 
    # Login endpoint URL
    path('login/', views.login, name='login_session'),
    # Logout endpoint URL
    path('logout/', views.logout, name='logout_session'),
]