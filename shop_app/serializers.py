from rest_framework import serializers
from .models import Products, Cart, CartItem, Profile
from django.contrib.auth import get_user_model

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
  #cart = CartSerializer(read_only=True)
  total = serializers.SerializerMethodField()
  class Meta:
    model = CartItem
    fields = ["id", "quantity", "product", "total"]

  def get_total(self, cart_item):
    price = cart_item.product.price * cart_item.quantity
    return price

class SimpleCartSerializer(serializers.ModelSerializer):
  num_of_items = serializers.SerializerMethodField()
  class Meta:
    model = Cart
    fields = ["id", "cart_code", "num_of_items"]

  def get_num_of_items(self, cart):
    num_of_items = sum([item.quantity for item in cart.items.all()])
    return num_of_items
  

class CartSerializer(serializers.ModelSerializer):
  items = CartItemSerializer(read_only=True, many=True)
  sum_total = serializers.SerializerMethodField()
  num_of_items = serializers.SerializerMethodField()
  class Meta:
    model = Cart
    fields = ["id", "cart_code", "items", "sum_total", "num_of_items", "create_at", "modified_at"]

  def get_sum_total(self, cart):
    items = cart.items.all()
    sum_total = sum([item.product.price * item.quantity for item in items])
    return sum_total
  
  def get_num_of_items(self, cart):
    items = cart.items.all()
    total = sum([item.quantity for item in items])
    return total
  

class NewCartItemSerializer(serializers.ModelSerializer):
  product = productSerializer(read_only=True)
  order_id = serializers.SerializerMethodField()
  order_date = serializers.SerializerMethodField()

  class Meta:
    model = CartItem
    fields = ["id", "product", "quantity", "order_id", "order_date"]

  def get_order_id(self, cartitem):
    order_id = cartitem.cart.cart_code
    return order_id
  
  def get_order_date(self, cartitem):
    order_date = cartitem.cart.modified_at
    return order_date


class UserSerializer(serializers.ModelSerializer):
  items = serializers.SerializerMethodField()
  class Meta:
    model = Profile
    fields = ["id", "city", "state", "address", "phone", "items"]
  

  def get_items(self, obj):
    # obj - это Profile
    user = obj.user  # 👈 Получаем CustomerUser из профиля
    cartitems = CartItem.objects.filter(cart__user=user, cart__paid=True)[:10]
    serializer = CartItemSerializer(cartitems, many=True)
    return serializer.data

  

class ProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    email = serializers.EmailField(source='user.email', read_only=True)
    first_name = serializers.CharField(source='user.first_name', read_only=True)
    last_name = serializers.CharField(source='user.last_name', read_only=True)
    items = serializers.SerializerMethodField()
    
    class Meta:
        model = Profile
        fields = [
            'id', 'username', 'email', 'first_name', 'last_name',
            'city', 'state', 'address', 'phone', 'avatar', 'items'
        ]
    
    def get_items(self, obj):
        # obj - это Profile, берем user из него
        user = obj.user
        cartitems = CartItem.objects.filter(cart__user=user, cart__paid=True)[:10]
        from .serializers import CartItemSerializer
        serializer = CartItemSerializer(cartitems, many=True)
        return serializer.data



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