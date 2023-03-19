from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from ..models import db, Product, Cart, User, CartItem
from .auth_routes import validation_errors_to_error_messages
from ..forms import CartForm
from datetime import datetime

cart_routes = Blueprint('cart', __name__)

@cart_routes.route('/<int:id>')
# @login_required
def get_user_cart(id):
    """
    Fetches the user's cart and returns it and all the items in the cart
    """
    user = User.query.get(id)
    print(user.cart, 'testinggggggggg')
    return {"cart": user.cart.to_dict()}


@cart_routes.route('/<int:id>',  methods=['POST'])
def add_product(id):
    """
    Adds products to the cart. The function also handles both adding new items to the cart 
    as well as inreasing the amount of an item already in the cart.
    """
    form = CartForm()
    user = User.query.get(id)
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        product_id = form.data['product_id']
        product = Product.query.get(product_id)
        quantity = form.data['quantity']
        total = product.price * form.data['quantity']
        cart_items = [item.product_id for item in user.cart.items]
        if product_id in  cart_items:
            item = [item for item in user.cart.items if item.product_id == product_id]
            found_item = item[0]
            found_item.quantity = found_item.quantity + quantity
            user.cart.total = user.cart.total + total
            db.session.commit()
            return {"cart": user.cart.to_dict()}
        cart_item = CartItem(
            cart=user.cart,
            product=product,
            quantity=form.data['quantity']
        )
        user.cart.total = user.cart.total + total
        db.session.add(cart_item)
        db.session.commit()
        return {"cart": user.cart.to_dict()}
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400


@cart_routes.route('<int:id>',methods=['PUT'])
def update_cart(id):
    """
    route is only for removing items from the cart. Use the add_product to increase the quantity of an item.
    """
    form = CartForm()
    user = User.query.get(id)
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        product_id = form.data['product_id']
        product = Product.query.get(product_id)
        quantity = form.data['quantity']
        total = product.price * form.data['quantity']
        cart_items = [item.product_id for item in user.cart.items]
        if product_id in  cart_items:
            item = [item for item in user.cart.items if item.product_id == product_id]
            found_item = item[0]
            if found_item.quantity <= quantity:
                db.session.delete(found_item)
                new_total = found_item.quantity * product.price
                user.cart.total = user.cart.total - new_total
                db.session.commit()
                return {"cart": user.cart.to_dict()}
            found_item.quantity = found_item.quantity - quantity
            user.cart.total = user.cart.total - total
            db.session.commit()
            return {"cart": user.cart.to_dict()}
        else:
            return {"errors": 'Product not in cart'}
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400


