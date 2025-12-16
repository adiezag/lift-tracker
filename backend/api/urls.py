from django.urls import path
from . import views
urlpatterns = [
    path("lifts/", views.LiftListCreate.as_view(), name="lift-list"),
    path("lifts/delete/<int:pk>/", views.LiftDelete.as_view(), name="delete-lift"),
]