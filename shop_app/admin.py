from django.contrib import admin
from .models import Products, Cart, CartItem

# Register your models here.
admin.site.register([Products, Cart, CartItem])