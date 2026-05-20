from rest_framework import serializers
from .models import Products

class productSerializer(serializers.ModelSerializer):
  class Meta:
    model = Products
    fields = ["id", "name", "slug", "image", "description", "category", "price"]