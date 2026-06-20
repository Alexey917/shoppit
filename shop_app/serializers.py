from rest_framework import serializers
from .models import Products, Cart, CartItem

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

# Преобразует модели Cart в JSON и обратно
class CartSerializer(serializers.ModelSerializer):
  class Meta:
    model = Cart
    # Показывает только 4 поля: id, cart_code, create_at, modified_at(Поле user и paid скрыты в этом сериализаторе)
    fields = ["id", "cart_code", "create_at", "modified_at",]

class CartItemSerializer(serializers.ModelSerializer):
  # Переопределяет поля product и cart для вложенного отображения
  product = productSerializer(read_only=True) # Вместо ID продукта показывает полную информацию о продукте(read_only=True - поле только для чтения (нельзя изменить через этот сериализатор))
  cart = CartSerializer(read_only=True)
  class Meta:
    model = CartItem
    fields = ["id", "quantity", "product", "cart",]

class SimpleCartSerializer(serializers.ModelSerializer):
  num_of_items = serializers.SerializerMethodField()
  class Meta:
    model = Cart
    fields = ["id", "cart_code", "num_of_items"]

  def get_num_of_items(self, cart):
    num_of_items = sum([item.quantity for item in cart.items.all()])
    return num_of_items


"""
{
    "id": 1,
    "quantity": 2,
    "product": {
        "id": 5,
        "name": "iPhone 15",
        "price": 999.99,
        "description": "Новый смартфон"
    },
    "cart": {
        "id": 1,
        "cart_code": "ABC123XYZ",
        "create_at": "2026-06-18T10:30:00Z",
        "modified_at": "2026-06-18T10:30:00Z"
    }
}
"""