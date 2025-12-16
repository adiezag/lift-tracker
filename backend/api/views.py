from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, LiftSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Lift
# Create your views here.

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = []

class LiftListCreate(generics.ListCreateAPIView):
    serializer_class = LiftSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Lift.objects.filter(user=self.request.user)
    

    def perform_create(self, serializer):
        serializer.save(user = self.request.user)
        
class LiftDelete(generics.DestroyAPIView):
        serializer_class = LiftSerializer
        permission_classes = [IsAuthenticated]

        def get_queryset(self):
            return Lift.objects.filter(user=self.request.user)

class LiftUpdate(generics.UpdateAPIView):
    serializer_class = LiftSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return Lift.objects.filter(user=self.request.user)