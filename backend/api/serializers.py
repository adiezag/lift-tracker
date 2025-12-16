from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Lift

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        print(user)
        return user
    
class LiftSerializer(serializers.ModelSerializer):
    estimated_1rm = serializers.ReadOnlyField()

    class Meta:
        model = Lift
        fields = ["id", "user", "lift_type", "weight", "reps", "date", "notes", "created_at", "estimated_1rm"]
        extra_kwargs = {"user": {"read_only": True},
                        "date": {"input_formats": ["%Y-%m-%d"]}}