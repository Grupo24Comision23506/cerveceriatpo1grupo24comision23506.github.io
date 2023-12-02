from rest_framework.viewsets import ModelViewSet
from .models import Cerveza
from .serializers import CervezaSerializer

class CervezaViewSet(ModelViewSet):
    queryset = Cerveza.objects.all()
    serializer_class = CervezaSerializer