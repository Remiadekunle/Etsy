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
        cart_item = CartItem(
            cart=user.cart,
            product=product,
            quantity=form.data['quantity']
        )
        total = product.price * form.data['quantity']
        user.cart.total = total
        db.session.add(cart_item)
        db.session.commit()
        return {"cart": user.cart.to_dict()}
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400
