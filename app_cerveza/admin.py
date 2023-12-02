from django.contrib import admin
from .models import cerveza

# Register your models here.
@admin.register(Cerveza)
class CervezaAdmin(admin.ModelAdmin):
    ...

