from django.urls import path
from webdem import views

urlpatterns = [
    path('',views.index , name="index"),
    path('upload/',views.upload_file , name="upload_file"),
    path('show/', views.show_html_table, name='show_html_table'),
    path('export/', views.export_data_to_excel, name='export_data_to_excel'),

]