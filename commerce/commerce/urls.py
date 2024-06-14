"""commerce URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from products.views import IndexView, ProductListView, ProductDetailView
from products.views import ContactView, Error404View, CartView
from products.views import TestimonialView, CheckoutView, SearchProductView
from categories.views import CategoryDetailView

urlpatterns = [
    path('admin/', admin.site.urls),
    path("", IndexView.as_view(), name="index"),
    path("<slug:category>", IndexView.as_view(), name="index"),
    path("contact/", ContactView.as_view(), name="contact"),
    path("search/", SearchProductView.as_view(), name="search"),
    path("cart/", CartView.as_view(), name="cart"),
    path("checkout/", CheckoutView.as_view(), name="checkout"),
    path("testimonial/", TestimonialView.as_view(), name="testimonial"),
    path("404/", Error404View.as_view(), name="error-404"),
    path("products/", ProductListView.as_view(), name="products-list"),
    path("products/<int:pk>", ProductDetailView.as_view(), name="products-show"),
    path("categories/<slug:category>",
         CategoryDetailView.as_view(), name="category-show"),
    path("__debug__/", include("debug_toolbar.urls")),
    # ]
] + (static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT))
# (static(settings.STATIC_URL, document_root=settings.STATIC_ROOT))
