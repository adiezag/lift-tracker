from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

# Create your models here.

class Lift(models.Model):
    LIFT_TYPES = [
        ("squat", "Squat"), 
        ("bench", "Bench Press"),
        ("deadlift", "Deadlift"),
        ("overhead_press", "Overhead Press")
    ]
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='lifts')
    lift_type = models.CharField(max_length=20, choices=LIFT_TYPES)
    weight = models.DecimalField(max_digits=6, decimal_places=2)  # handles 9999.99 lbs
    reps = models.PositiveIntegerField()
    # date = models.DateField()  # just the date, not timestamp

    notes = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    date = models.DateField(default=timezone.now) 
    class Meta:
        ordering = ['-date', '-created_at']
    
    def __str__(self):
        return f"{self.user.username} - {self.get_lift_type_display()} - {self.weight}lbs x {self.reps}"
    
    @property
    def estimated_1rm(self):
        return round(float(self.weight) * (1 + self.reps / 30), 2)

