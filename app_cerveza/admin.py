from sre_constants import ANY_ALL
from django.contrib import admin
from .models import Cerveza; ANY_ALL

# Register your models here.
@admin.register(Cerveza)
class CervezaAdmin(admin.ModelAdmin):
    ...

