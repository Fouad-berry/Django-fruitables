from django.shortcuts import render, get_object_or_404, redirect
from django.views import View
from django.http import JsonResponse
from products.cart import Cart
from django.views.generic import ListView, DetailView
from products.models import Product
# Create your views here.


class CartView(View):
    template_name = "products/cart.html"

    def get(self, request, *args, **kwargs):
        cart = request.session.get('session-key')
        products = []
        for product_id, product_data in cart.items():
            products.append(product_data)
        return render(request, self.template_name, context={'products': products})

    def post(self, request, *args, **kwargs):
        cart = Cart(request)
        product_id = request.POST.get('product_id')
        product = get_object_or_404(Product, pk=product_id)
        cart.add(product=product)
        cart_quantity = cart.__len__()
        name = cart.cart[str(product_id)]['name']
        new_price = cart.cart[str(product_id)]['total']
        quantity = cart.cart[str(product_id)]['quantity']
        priceHT = cart.setPriceHT()
        return JsonResponse({'name': name, "cart_quantity": cart_quantity, "quantity": quantity, 'price': new_price, 'priceHT': priceHT})

    def delete(self, request, *args, **kwargs):
        # product_name = request.DELETE.get('product_id')
        delete_queryset = QueryDict(request.body)
        product_name = delete_queryset.get('product_id')

        print(product_name)
        cart = request.session.get('session-key')
        mycart = Cart(request)
        product = Product.objects.filter(name=product_name).first()
        print(product)
        productId = str(product.id)
        for product_id, product_data in cart.items():
            if productId == product_id:
                mycart.remove(product)
        return redirect('cart')