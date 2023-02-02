from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from ..models import db, Product, Cart, User, CartItem, Order, OrderItem
from .auth_routes import validation_errors_to_error_messages
from ..forms import CartForm, OrderForm
from datetime import datetime, timedelta

order_routes = Blueprint('order', __name__)

@order_routes.route('/')
@login_required
def get_user_cart():
    orders = Order.query.filter(Order.user_id == current_user.id).order_by(Order.created_at).all()[::-1]
    print('hey these are the orders', [order.created_at.strftime('%m/%d/%Y') for order in orders])
    delta = timedelta(
            days=2
    )
    date = datetime(2023, 1, 19)
    print('qqqqqqqqqqqqqqqqqqqqqqq', date)
    print(delta, 'wwwwwwwwwwwwwwwwwwwwwwwwwwwwwww')
    print('this is after adding them', delta + datetime.now())
    return {"orders": [order.to_dict() for order in orders]}

@order_routes.route('/<int:id>')
# @login_required
def get_user_cart2(id):
    user = User.query.get(id)
    orders = Order.query.filter(Order.user_id == user.id)
    print('help yo', user.to_dict())
    return {"orders": [order.to_dict() for order in orders]}



@order_routes.route('/',  methods=['POST'])
@login_required
def create_order():
    form = OrderForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        delta = timedelta(
            days=1,
        )
        delta2 = timedelta(
            microseconds=10
        )
        delivery_delta = timedelta(
            days=3
        )
        expiration = delta + datetime.now()
        deliverd = delivery_delta + datetime.now()
        order = Order(
            total=0,
            user=current_user,
            address=form.data['address'],
            city=form.data['city'],
            state=form.data['state'],
            created_at=datetime.now(),
            updated_at=datetime.now(),
            expires=expiration,
            delivery=deliverd
        )
        errors = []
        cart_items = [item for item in current_user.cart.items]
        for item in cart_items:
            product = item.product
            print('yay we got the product', product)
            print('yay we got the products stock', product.stock)
            if product.stock == 0:
                errors.append(f'{item.product.name} is out of stock')
                return {'errors': f'{item.product.name} is out of stock'}, 400
            elif item.quantity > product.stock:
                order.notes = order.notes + f'{item.product.name}s stock was {product.stock} we have placed an order for that amount and charged only for the amount placed-'
                errors.append(f'{item.product.name}s stock was {product.stock} we have placed an order for that amount and charged only for the amount placed')
                item.quantity = product.stock
            order_item = OrderItem(
                quantity = item.quantity,
                product = item.product,
                order=order,
                option=item.option
            )
            product.stock = product.stock - item.quantity
            print('yay this is the new order-item', order_item)
            print('yay we got the new stock', product.stock)
            new_cost = item.quantity * product.price
            order.total = order.total + new_cost
            db.session.add(order_item)
            current_user.cart.total = current_user.cart.total - new_cost
            db.session.delete(item)
        print('these are the order items',order.items )
        print('just checkingout the cart', current_user.cart.to_dict())
        db.session.commit()
        return {"order": order.to_dict(), 'errors': errors}
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400


@order_routes.route('/<int:id>',  methods=['PUT'])
@login_required
def edit_order(id):
    form = OrderForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        order = Order.query.get(id)
        order.address=form.data['address']
        order.city=form.data['city']
        order.state=form.data['state']
        order.updated_at=datetime.now()
        db.session.commit()
        return {"order": order.to_dict()}
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400

@order_routes.route('/<int:id>',  methods=['DELETE'])
@login_required
def delete_order(id):
    order = Order.query.get(id)
    order_items = order.items
    for item in order_items:
        quantity = item.quantity
        product_id = item.product_id
        product = Product.query.get(product_id)
        product.stock = product.stock + quantity
        db.session.delete(item)
    db.session.delete(order)
    db.session.commit()
    return {'message': 'Its done'}
