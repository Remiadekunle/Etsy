from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from ..models import db, Product, Cart, User, CartItem, Order, OrderItem
from .auth_routes import validation_errors_to_error_messages
from ..forms import CartForm, OrderForm
from datetime import datetime

order_routes = Blueprint('order', __name__)

@order_routes.route('/')
@login_required
def get_user_cart(id):
    return {"cart": current_user.cart.to_dict()}


@order_routes.route('/<int:id>',  methods=['POST'])
def create_order(id):
    form = CartForm()
    user = User.query.get(id)
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        product_id = form.data['product_id']
        product = Product.query.get(product_id)
        quantity = form.data['quantity']
        total = user.cart.total
        print('this is the total', total)
        order = Order(
            total=0,
            user=user
        )
        errors = []
        cart_items = [item for item in user.cart.items]
        for item in cart_items:
            product = item.product
            print('yay we got the product', product)
            print('yay we got the products stock', product.stock)
            if product.stock == 0:
                errors.append(f'{item.product.name} is out of stock')
                continue
            elif item.quantity > product.stock:
                item.quantity = product.stock
            order_item = OrderItem(
                quantity = item.quantity,
                product = item.product,
                order=order
            )
            product.stock = product.stock - item.quantity
            print('yay this is the new order-item', order_item)
            print('yay we got the new stock', product.stock)
            new_cost = item.quantity * product.price
            order.total = order.total + new_cost
            db.session.add(order_item)
        print('these are the order items',cart_items )
        db.session.commit()
        return {"order": order.to_dict()}