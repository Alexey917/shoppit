from django.db import models
from django.utils.text import slugify
from django.conf import settings

# Create your models here.
class Products(models.Model):
  CATEGORY = (
    ("Electronics", "ELECTRONICS"),
    ("Groceries", "GROCERIES"),
    ("Clothings", "Спортивная одежда"),
    ("Accessories", "Аксессуары"),
    ("Shoes", "Обувь"),
  )
  name = models.CharField(max_length=100)
  slug = models.SlugField(blank=True, null=True)
  image = models.ImageField(upload_to="img")
  description = models.TextField(blank=True, null=True)
  price = models.DecimalField(max_digits=10, decimal_places=2)
  category = models.CharField(max_length=15, choices=CATEGORY, blank=True, null=True)

  def __str__(self):
    return self.name

  def save(self, *args, **kwargs):
    if not self.slug:
      self.slug = slugify(self.name)
      unique_slug = self.slug
      counter = 1
      if Products.objects.filter(slug=unique_slug).exists():
        unique_slug = f'{self.slug}-{counter}'
        counter += 1
      self.slug = unique_slug
    
    super().save(*args, **kwargs)


class Cart(models.Model):
  # уникальный идентификатор корзины (строка до 11 символов). Используется для идентификации корзины, если пользователь не авторизован
  cart_code = models.CharField(max_length=11, unique=True) 
  # связь с пользователем (внешний ключ). Если пользователь удален, корзина тоже удаляется (CASCADE). blank=True означает, что поле может быть пустым (для гостевых корзин)
  user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=True, null=True)
  # флаг, оплачена ли корзина (по умолчанию False)
  paid = models.BooleanField(default=False)
  # дата и время создания корзины (устанавливается автоматически при создании)
  create_at = models.DateTimeField(auto_now_add=True, blank=True, null=True)
  # дата и время последнего изменения (обновляется автоматически при каждом сохранении)
  modified_at = models.DateTimeField(auto_now=True, blank=True, null=True)

  def __str__(self):
    return self.cart_code
  
class CartItem(models.Model):
  # ссылка на корзину, к которой принадлежит элемент. related_name='items' позволяет обращаться к элементам из корзины через cart.items
  cart = models.ForeignKey(Cart, related_name='items', on_delete=models.CASCADE)
  # ссылка на товар (продукт)
  product = models.ForeignKey(Products, on_delete=models.CASCADE)
  # количество товара в корзине (по умолчанию 1)
  quantity = models.IntegerField(default=1)
  

  def __str__(self):
    return f"{self.quantity} x {self.product.name} in cart {self.cart.id}"