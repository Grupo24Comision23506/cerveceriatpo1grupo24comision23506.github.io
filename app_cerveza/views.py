from django.urls import reverse_lazy
from django.views import View
from django.views.generic import TemplateView
from django.shortcuts import render

from django.views.generic.list import ListView
from django.views.generic.edit import DeleteView, UpdateView, CreateView
from django.views.generic.detail import DetailView

from .models import Cerveza

# Create your views here.
class IndexPage(TemplateView):
    template_name = "index.html"

class HistoriaPage(TemplateView):
    template_name = "Historia.html"

class MarketPage(TemplateView):
    template_name = "market.html"

class CartaPage(TemplateView):
    template_name = "Cartas.html"
class FormularioPage(TemplateView):
    template_name = "Formulario.html"

class CervezasBaseView(View):
    template_name = 'base_cerveceria.html'
    model = Cerveza
    fields = '__all__'
    success_url = reverse_lazy('cervezas:all')

class Cervezas(CervezasBaseView, DetailView):
    template_name = "cervezas.html"


class CervezasListView(CervezasBaseView,ListView):
    template_name = "cervezas.html"
    """
    ESTO ME PERMITE CREAR UNA VISTA CON LAS CERVEZAS
    """

class CervezasDetailView(CervezasBaseView,DetailView):
    template_name = "cerveza_detail.html"

class CervezasCreateView(CervezasBaseView,CreateView):
    template_name = "cerveza_create.html"
    extra_context = {
        "tipo": "Crear cerveza"
    }

class CervezasUpdateView(CervezasBaseView,UpdateView):
    template_name = "cerveza_create.html"
    extra_context = {
        "tipo": "Actualizar cerveza"
    }

class CervezasDeleteView(CervezasBaseView,DeleteView):
    template_name = "cerveza_delete.html"
    extra_context = {
        "tipo": "Borrar cerveza"
    }
