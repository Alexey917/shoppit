from rest_framework import serializers
from .models import Products

class productSerializer(serializers.ModelSerializer):
  class Meta:
    model = Products
    fields = ["id", "name", "slug", "image", "description", "category", "price"]

class DetailedProductSerializer(serializers.ModelSerializer):
  similar_products = serializers.SerializerMethodField()
  class Meta:
    model = Products
    fields = ["id", "name", "slug", "image", "description", "similar_products", "price"]
  
  def get_similar_products(self, product):
    products = Products.objects.filter(category=product.category).exclude(id=product.id)
    serializer = productSerializer(products, many=True)
    return serializer.data