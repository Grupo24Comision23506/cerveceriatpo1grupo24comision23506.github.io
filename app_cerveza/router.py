from rest_framework import routers
from .viewsets import CervezaViewSet

router = routers.SimpleRouter()
router.register("api-cerveza",CervezaViewSet)