from django.db import models

# Create your models here.

class Cerveza(models.Model):
    nombre  =  models.CharField(max_length=200)
    rating = models.PositiveSmallIntegerField(blank=False,null=False)
    abv = models.FloatField(blank=True, null=True)


    class Meta:
        db_table = "cerveza_table"

    def __str__(self):
        return f"La Cerveza: {self.nombre}, Rating {self.abv}"
    
    def get_fields(self):
        return [
            (field.verbose_name, field.value_from_object(self))
            for field in self.__class__._meta.fields[1:]
        ]
        
        