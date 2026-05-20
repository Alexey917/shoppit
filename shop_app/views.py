from django.shortcuts import render
from rest_framework.decorators import api_view
from .models import Products
from .serializers import productSerializer
from rest_framework.response import Response

# Create your views here.

@api_view(["GET"])
def products(request):
  products = Products.objects.all()
  serializer = productSerializer(products, many=True)
  return Response(serializer.data)
