from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from ..models import db, Product, Cart, User, CartItem, Order, OrderItem, Category
from .auth_routes import validation_errors_to_error_messages
from ..forms import CartForm, OrderForm
from datetime import datetime, timedelta
from random import choices, randint

category_routes = Blueprint('category', __name__)

@category_routes.route('/')
def get_categories():
    return 'hi'

@category_routes.route('/<int:id>')
def get_category_products(id):
    category = Category.query.get(id)
    return {"category": [product.to_dict() for product in category.products]}


@category_routes.route('/<int:id>/recs')
def get_category_recs(id):
    category = Category.query.get(id)
    products = category.products
    # res2 = choices(products, k=6)
    res = []
    for i in range(7):
        idx = randint(0, len(products) - 1)
        res.append(products[idx])
    return {"products": [product.to_dict() for product in res], 'len': len(res)}, 200
