from django.urls import path
from .router import router

from .views import (
    CervezasListView,
    CervezasDetailView,
    CervezasCreateView,
    CervezasUpdateView,
    CervezasDeleteView
)

app_name = 'cerveza'

urlpatterns = [
    path("", CervezasListView.as_view(), name="all"),
    path("home", CervezasListView.as_view(), name="home"),
    path("create/", CervezasCreateView.as_view(), name="create"),
    path("<int:pk>/detail/", CervezasDetailView.as_view(), name="detail"),
    path("<int:pk>/update/", CervezasUpdateView.as_view(), name="update"),
    path("<int:pk>/delete/", CervezasDeleteView.as_view(), name="delete")
]

urlpatterns += router.urls
