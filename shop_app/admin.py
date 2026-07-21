from django.contrib import admin
from .models import Products, Cart, CartItem, Profile

# Register your models here.
admin.site.register([Products, Cart, CartItem, Profile])