from django.shortcuts import render
from django.views import View
from django.views.generic import ListView
from products.models import Category, Product
# Create your views here.


class CategoryDetailView(ListView):
    template_name = "products/list_category_product.html"
    context_object_name = 'products'  # Le nom de la variable passée au template

    def get_queryset(self):
        # Récupérer la catégorie à partir de l'URL
        category = self.kwargs['category']
        # Filtrer les produits par la catégorie sélectionnée
        return Product.objects.filter(category__slug=category)

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        # Ajouter la catégorie au contexte pour l'utiliser dans le template
        slug = self.kwargs['category']
        categories = Category.objects.all()
        categories_with_count = []
        for category in categories:
            product_count = Product.objects.filter(category=category).count()
            categories_with_count.append((category, product_count))

        context['category_selected'] = Category.objects.get(slug=slug)
        context['categories_with_count'] = categories_with_count
        return context
