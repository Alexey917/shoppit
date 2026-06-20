from django.shortcuts import render
from rest_framework.decorators import api_view
from .models import Products, Cart, CartItem
from .serializers import productSerializer, DetailedProductSerializer, CartItemSerializer
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

@api_view(["POST"])
def add_item(request):
  try:
    cart_code = request.data.get("cart_code")
    product_id = request.data.get("product_id")

    cart, _ = Cart.objects.get_or_create(cart_code = cart_code)
    product = Products.objects.get(id=product_id)

    cart_item, created = CartItem.objects.get_or_create(cart = cart, product = product)
    cart_item.quantity = 1
    cart_item.save()

    serializer = CartItemSerializer(cart_item)
    if not created:
      return Response({"data": serializer.data, "message": "Product already in cart"}, status=200)
    return Response({"data": serializer.data, "message": "CartItem created successfully"}, status=201)
  except Exception as e:
    return Response({"error": str(e)}, status=400)
  
@api_view(["GET"])
def product_in_cart(request):
  cart_code = request.query_params.get("cart_code")
  product_id = request.query_params.get("product_id")

  cart = Cart.objects.get(cart_code=cart_code)
  product = Products.objects.get(id=product_id)

  product_exists_in_cart = CartItem.objects.filter(cart=cart, product=product).exists()

  return Response({'product_exists_in_cart': product_exists_in_cart})
