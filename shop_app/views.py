from django.shortcuts import render
from rest_framework.decorators import api_view
from .models import Products
from .serializers import productSerializer, DetailedProductSerializer
from rest_framework.response import Response

# Create your views here.

@api_view(["GET"])
def products(request):
  products = Products.objects.all()
  serializer = productSerializer(products, many=True)
  return Response(serializer.data)

@api_view(["GET"])
def product_detail(request, slug):
  product = Products.objects.get(slug=slug)
  serializer = DetailedProductSerializer(product)
  return Response(serializer.data)
