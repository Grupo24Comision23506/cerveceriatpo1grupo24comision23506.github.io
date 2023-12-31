from django.urls import path
from .router import router
from .views import (IndexPage ,
                    HistoriaPage,
                    MarketPage,
                    CartaPage,
                    FormularioPage,
                    CervezasListView,
                    CervezasDetailView,
                    CervezasCreateView,
                    CervezasUpdateView,
                    CervezasDeleteView
)

app_name = 'cerveza'

urlpatterns = [
    path("", IndexPage.as_view(), name="Index"),
    path("HistoriaPage", HistoriaPage.as_view(), name="Historia"),
    path("MarketPage", MarketPage.as_view(), name="market"),
    path("CartaPage", CartaPage.as_view(), name="Cartas"),
    path("FormularioPage", FormularioPage.as_view(), name="Formulario"),
    # path("", CervezasListView.as_view(), name="all"),
    path("home", CervezasListView.as_view(), name="home"),
    path("create/", CervezasCreateView.as_view(), name="create"),
    path("<int:pk>/detail/", CervezasDetailView.as_view(), name="detail"),
    path("<int:pk>/update/", CervezasUpdateView.as_view(), name="update"),
    path("<int:pk>/delete/", CervezasDeleteView.as_view(), name="delete")
]

urlpatterns += router.urls
