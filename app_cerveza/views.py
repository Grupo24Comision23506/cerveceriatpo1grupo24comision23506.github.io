from django.urls import reverse_lazy
from django.views.generic.list import ListView
from django.views.generic.edit import DeleteView, UpdateView, CreateView
from django.views.generic.detail import DetailView
from django.shortcuts import render
from .models import Cerveza

class CervezasBaseView:
    template_name = 'cervezas.html'
    model = Cerveza
    fields = '__all__'
    success_url = reverse_lazy('home')

class CervezasListView(ListView):
    template_name = 'cervezas.html'
    model = Cerveza  # Modelo desde el que obtendrá la lista de objetos

    # Opcional: puedes especificar un nombre de contexto personalizado
    context_object_name = 'cervezas'

class CervezasDetailView(CervezasBaseView, DetailView):
    template_name = "cerveza_detail.html"

class CervezasCreateView(CervezasBaseView, CreateView):
    template_name = "cerveza_create.html"
    extra_context = {
        "tipo": "Crear cerveza"
    }

class CervezasUpdateView(CervezasBaseView, UpdateView):
    template_name = "cerveza_create.html"
    extra_context = {
        "tipo": "Actualizar cerveza"
    }

class CervezasDeleteView(CervezasBaseView, DeleteView):
    template_name = "cerveza_delete.html"
    extra_context = {
        "tipo": "Borrar cerveza"
    }
