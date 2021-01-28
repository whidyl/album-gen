from django.urls import path
from . import views

urlpatterns = [
    #path('generated', get_generated_image),
    path('generate', views.generate_image)
]
