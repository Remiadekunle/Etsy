from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from ..models import db, Product, Cart, User, CartItem
from .auth_routes import validation_errors_to_error_messages
from ..forms import CartForm

cart_routes = Blueprint('cart', __name__)

@cart_routes.route('/<int:id>')
# @login_required
def get_user_cart(id):
    user = User.query.get(id)
    print(user.cart, 'testinggggggggg')
    return {"cart": user.cart.to_dict()}


@cart_routes.route('/<int:id>',  methods=['POST'])
def add_product(id):
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
            print('this is item', item[0])
            found_item = item[0]
            print('quanity b4', found_item.quantity)
            found_item.quantity = found_item.quantity + quantity
            print('quanity after', found_item.quantity)
            user.cart.total = user.cart.total + total
            db.session.commit()
            # return 'good'
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
            print('quanity b4', found_item.quantity)
            found_item.quantity = found_item.quantity - quantity
            if found_item.quanity <= 0:
                db.session.delete()
            print('quanity after', found_item.quantity)
            user.cart.total = user.cart.total + total
        return 'hi'
