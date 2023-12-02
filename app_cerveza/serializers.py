from rest_framework.serializers import ModelSerializer
from .models import Cerveza

class VinoSerializer(ModelSerializer):
    class Meta:
        model = Cerveza
        fields = "__all__"