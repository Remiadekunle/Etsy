from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from ..models import db, Product, Cart, User, Review
from .auth_routes import validation_errors_to_error_messages
from ..forms import ProductForm, ReviewForm
from datetime import datetime, timedelta

product_routes = Blueprint('product', __name__)

@product_routes.route('/')
def get_all_products():
    products = Product.query.all()
    res = [product.to_dict() for product in products]
    # print(res)
    return {'products': res}

@product_routes.route('/', methods=['POST'])
@login_required
def create_product():
    form = ProductForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        product = Product(
            name=form.data['name'],
            description=form.data['description'],
            price=form.data['price'],
            stock=form.data['stock'],
            options=form.data['options'],
            preview_img=form.data['preview_img'],
            owner=current_user
        )

        db.session.add(product)
        db.session.commit()
        return {"product": product.to_dict()} , 201
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400

@product_routes.route('/<int:id>', methods=['PUT'])
@login_required
def update_product(id):
    product = Product.query.get(id)
    form = ProductForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        product.name=form.data['name']
        product.description=form.data['description']
        product.price=form.data['price']
        product.stock=form.data['stock']
        product.options=form.data['options']
        product.preview_img=form.data['preview_img']

        db.session.commit()
        return {"product": product.to_dict()} , 201
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400

@product_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_product(id):
    product = Product.query.get(id)
    if product:
        db.session.delete(product)
        db.session.commit()
        return { "message": "Deleted"}, 200
    else:
        return {"message":'Product couldn\'t be found'} , 404

# @product_routes.route('/<int:id>/reviews', methods=['GET'])
# def get_product_reviews(id):
#     product = Product.query.get(id)


@product_routes.route('/<int:id>/reviews', methods=['POST'])
@login_required
def create_review(id):
    product = Product.query.get(id)
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        review = Review(
            content=form.data['content'],
            stars=form.data['stars'],
            review_img=form.data['img'],
            user=current_user,
            product=product,
            created_at=datetime.now(),
            updated_at=datetime.now(),
        )
        db.session.add(review)
        db.session.commit()
        return {"review": review.to_dict(), "product": product.to_dict()}, 201
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400

# @product_routes.route('/<int:id>/reviews', methods=['POST'])
# @login_required
# def create_review2(id):
#     user = User.query.get(1)
#     product = Product.query.get(id)
#     form = ReviewForm()
#     form['csrf_token'].data = request.cookies['csrf_token']
#     if form.validate_on_submit():
#         review = Review(
#             content=form.data['content'],
#             stars=form.data['stars'],
#             review_img=form.data['img'],
#             user=user,
#             product=product,
#             created_at=datetime.now(),
#             updated_at=datetime.now(),
#         )
#         db.session.add(review)
#         db.session.commit()
#         return{"review": review.to_dict()}
#     else:
#         return {'errors': validation_errors_to_error_messages(form.errors)}, 400


@product_routes.route('/<int:id>/reviews/<int:reviewId>', methods=['PUT'])
def edit_review(id, reviewId):
    product = Product.query.get(id)
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        review = Review.query.get(reviewId)
        review.content = form.data['content']
        review.stars=form.data['stars']
        review.review_img=form.data['img']
        review.updated_at=datetime.now()
        db.session.commit()
        return {"review": review.to_dict(), "product": product.to_dict()}, 200
    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400


@product_routes.route('/<int:id>/reviews/<int:reviewId>', methods=['DELETE'])
def delete_review(id, reviewId):
    review = Review.query.get(reviewId)
    if review:
        db.session.delete(review)
        db.session.commit()
        return { "message": "Deleted"}, 200
    else:
        return {"message":'Review couldn\'t be found'} , 404
