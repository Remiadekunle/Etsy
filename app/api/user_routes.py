from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from .auth_routes import validation_errors_to_error_messages
from app.models import User, Product, db
from ..forms import ProductForm, ReviewForm, SearchForm, FavForm

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users][1:5]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()

@user_routes.route('/favorties', methods=['POST'])
@login_required
def add_fav():
    form = FavForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    favs = [fav.id for fav in current_user.favorites]
    if (form.data['product_id'] in favs):
        return {'errors': 'Item already favorited'}, 400
    if form.validate_on_submit():
        product_id = form.data['product_id']
        product = Product.query.get(product_id)
        current_user.favorites.append(product)
        db.session.commit()
        return current_user.to_dict()
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400

@user_routes.route('/favorties', methods=['PUT'])
@login_required
def edit_fav():
    form = FavForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        product_id = form.data['product_id']
        product = Product.query.get(product_id)
        if product_id not in [fav.id for fav in current_user.favorites]:
            return {'errors': 'Item not favorited'}, 400
        current_user.favorites.remove(product)
        db.session.commit()
        return current_user.to_dict()
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400

# @user_routes.route('/<int:id>/favorties', methods=['PUT'])
# # @login_required
# def edit_fav(id):
#     user = User.query.get(id)
#     form = FavForm()
#     form['csrf_token'].data = request.cookies['csrf_token']
#     if form.validate_on_submit():
#         product_id = form.data['product_id']
#         product = Product.query.get(product_id)
#         if product_id not in [fav.id for fav in user.favorites]:
#             return {'errors': 'Item not favorited'}, 400
#         user.favorites.remove(product)
#         # filterd = [favs for fav in user.favorites if not fav.id == form.data['product_id']]
#         # user.favorites = filterd
#         db.session.commit()
#         return user.to_dict()
#     else:
#         return 'hi'

# @user_routes.route('/<int:id>/favorties', methods=['POST'])
# def add_fav(id):
#     user = User.query.get(id)
#     form = FavForm()
#     form['csrf_token'].data = request.cookies['csrf_token']
#     favs = [fav.id for fav in user.favorites]
#     if (form.data['product_id'] in favs):
#         return {'errors': 'Item already favorited'}, 400
#     if form.validate_on_submit():
#         product_id = form.data['product_id']
#         product = Product.query.get(product_id)
#         user.favorites.append(product)
#         db.session.commit()
#         return user.to_dict()
#     else:
#         return {'errors': validation_errors_to_error_messages(form.errors)}, 400
