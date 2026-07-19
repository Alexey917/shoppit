from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomerUser

# Register your models here.
class CustomerUserAdmin(UserAdmin):
  add_fields = (
    (None, {
      'classes': ('wide',),
      'fields': ('username', 'email', 'first_name', 'last_name', 'password1', 'password2', 'city', 'state', 'address', 'phone', 'is_active')
    }),
  )

admin.site.register(CustomerUser, UserAdmin)