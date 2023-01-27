from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from ..models import db, Product, Cart, User, CartItem
from .auth_routes import validation_errors_to_error_messages
from ..forms import CartForm
from datetime import datetime

cart_routes = Blueprint('cart', __name__)

@cart_routes.route('/')
@login_required
def get_user_cart():
    return {"cart": current_user.cart.to_dict()}

@cart_routes.route('/<int:id>')
# @login_required
def get_user_cart2(id):
    user = User.query.get(id)
    return {"cart": user.cart.to_dict()}


@cart_routes.route('/',  methods=['POST'])
@login_required
def add_product():
    form = CartForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        product_id = form.data['product_id']
        product = Product.query.get(product_id)
        quantity = form.data['quantity']
        total = product.price * form.data['quantity']
        option = form.data['option']
        cart_items = [item.product_id for item in current_user.cart.items]
        if product_id in  cart_items:
            item = [item for item in current_user.cart.items if item.product_id == product_id and item.option == option]
            if len(item) < 1:
                new_item = CartItem(
                    cart=current_user.cart,
                    product=product,
                    quantity=form.data['quantity'],
                    option=form.data['option']
                )
                print('yay we managed to get the new item made', new_item.to_dict())
                current_user.cart.total = current_user.cart.total + total
                db.session.add(new_item)
                db.session.commit()
                return {"cart": current_user.cart.to_dict()}
            print('this is item', item[0])
            found_item = item[0]
            place = found_item.quantity * product.price
            print('quanity b4', found_item.quantity)
            found_item.quantity = found_item.quantity + quantity
            if found_item.quantity > product.stock:
                found_item.quantity = product.stock
                old_total = total
                total = product.price * product.stock
                total = total - place
            print('quanity after', found_item.quantity)
            current_user.cart.total = current_user.cart.total + total
            db.session.commit()
            # return 'good'
            return {"cart": current_user.cart.to_dict()}
        cart_item = CartItem(
            cart=current_user.cart,
            product=product,
            quantity=form.data['quantity'],
            option=form.data['option']
        )
        current_user.cart.total = current_user.cart.total + total
        db.session.add(cart_item)
        db.session.commit()
        return {"cart": current_user.cart.to_dict()}
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400

# @cart_routes.route('/',  methods=['POST'])
# # @login_required
# def add_product():
#     form = CartForm()
#     user = User.query.get(1)
#     form['csrf_token'].data = request.cookies['csrf_token']
#     if form.validate_on_submit():
#         product_id = form.data['product_id']
#         product = Product.query.get(product_id)
#         quantity = form.data['quantity']
#         total = product.price * form.data['quantity']
#         option = form.data['option']
#         cart_items = [item.product_id for item in user.cart.items]
#         if product_id in  cart_items:
#             item = [item for item in user.cart.items if item.product_id == product_id and item.option == option]
#             if len(item) < 1:
#                 new_item = CartItem(
#                     cart=user.cart,
#                     product=product,
#                     quantity=form.data['quantity'],
#                     option=form.data['option']
#                 )
#                 print('yay we managed to get the new item made', new_item.to_dict())
#                 user.cart.total = user.cart.total + total
#                 db.session.add(new_item)
#                 db.session.commit()
#                 return {"cart": user.cart.to_dict()}
#             print('this is item', item[0])
#             found_item = item[0]
#             print('quanity b4', found_item.quantity)
#             found_item.quantity = found_item.quantity + quantity
#             print('quanity after', found_item.quantity)
#             user.cart.total = user.cart.total + total
#             db.session.commit()
#             # return 'good'
#             return {"cart": user.cart.to_dict()}
#         cart_item = CartItem(
#             cart=user.cart,
#             product=product,
#             quantity=form.data['quantity'],
#             option=form.data['option']
#         )
#         user.cart.total = user.cart.total + total
#         db.session.add(cart_item)
#         db.session.commit()
#         return {"cart": user.cart.to_dict()}
#     else:
#         return {'errors': validation_errors_to_error_messages(form.errors)}, 400


# route is only for removing items from the cart. Use the add_product to increase the quantity of an item.
@cart_routes.route('/',methods=['PUT'])
@login_required
def update_cart():
    form = CartForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        product_id = form.data['product_id']
        product = Product.query.get(product_id)
        quantity = form.data['quantity']
        option = form.data['option']
        total = product.price * form.data['quantity']
        cart_items = [item.product_id for item in current_user.cart.items]
        if product_id in  cart_items:
            item = [item for item in current_user.cart.items if item.product_id == product_id and item.option == option]
            found_item = item[0]
            print('quanity b4', found_item.quantity)
            print('price b4', current_user.cart.total)
            if found_item.quantity <= quantity:
                db.session.delete(found_item)
                new_total = found_item.quantity * product.price
                current_user.cart.total = current_user.cart.total - new_total
                db.session.commit()
                return {"cart": current_user.cart.to_dict()}
            found_item.quantity = found_item.quantity - quantity
            print('quanity after', found_item.quantity)
            current_user.cart.total = current_user.cart.total - total
            print('price after', current_user.cart.total)
            db.session.commit()
            return {"cart": current_user.cart.to_dict()}
        else:
            return {"errors": 'Product not in cart'}
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400

# @cart_routes.route('<int:id>',methods=['PUT'])
# def update_cart2(id):
#     form = CartForm()
#     user = User.query.get(id)
#     form['csrf_token'].data = request.cookies['csrf_token']
#     if form.validate_on_submit():
#         product_id = form.data['product_id']
#         product = Product.query.get(product_id)
#         quantity = form.data['quantity']
#         option = form.data['option']
#         total = product.price * form.data['quantity']
#         cart_items = [item.product_id for item in user.cart.items]
#         if product_id in  cart_items:
#             item = [item for item in user.cart.items if item.product_id == product_id and item.option == option]
#             found_item = item[0]
#             print('quanity b4', found_item.quantity)
#             print('price b4', user.cart.total)
#             if found_item.quantity <= quantity:
#                 db.session.delete(found_item)
#                 new_total = found_item.quantity * product.price
#                 user.cart.total = user.cart.total - new_total
#                 db.session.commit()
#                 return {"cart": user.cart.to_dict()}
#             found_item.quantity = found_item.quantity - quantity
#             print('quanity after', found_item.quantity)
#             user.cart.total = user.cart.total - total
#             print('price after', user.cart.total)
#             db.session.commit()
#             return {"cart": user.cart.to_dict()}
#         else:
#             return {"errors": 'Product not in cart'}
#     else:
#         return {'errors': validation_errors_to_error_messages(form.errors)}, 400

@cart_routes.route('/item',methods=['PUT'])
@login_required
def delete_cart():
    form = CartForm()
    cart = current_user.cart
    product_id = form.data['product_id']
    option = form.data['option']
    product = Product.query.get(product_id)
    new_cart = [item for item in cart.items if item.product_id == product_id and item.option == option]
    print('yaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaay plz work ok', new_cart)
    new_cart = new_cart[0]
    total = product.price * new_cart.quantity
    db.session.delete(new_cart)
    current_user.cart.total = current_user.cart.total - total
    db.session.commit()
    print('new cart yo hella good', new_cart)
    return {"cart": current_user.cart.to_dict()}

@cart_routes.route('/clear',methods=['DELETE'])
@login_required
def delete_all_items():
    cart = current_user.cart
    cart_items = [item for item in cart.items]
    for item in cart_items:
        db.session.delete(item)
    cart.total = 0.0
    db.session.commit()
    return {"cart": current_user.cart.to_dict()}
