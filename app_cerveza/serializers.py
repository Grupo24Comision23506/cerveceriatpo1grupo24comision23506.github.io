from rest_framework.serializers import ModelSerializer
from .models import Cerveza

class CervezaSerializer(ModelSerializer):
    class Meta:
        model = Cerveza
        fields = "__all__"