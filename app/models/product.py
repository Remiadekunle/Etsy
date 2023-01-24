from .db import db, environment, SCHEMA, add_prefix_for_prod
from .order import order_items

class Product(db.Model):
    __tablename__ = 'products'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False, unique=True)
    description = db.Column(db.String(200), nullable=False)
    price = db.Column(db.Numeric(precision=10, scale=2), nullable=False)
    stock = db.Column(db.Integer, nullable=False)
    options = db.Column(db.String(500), nullable=False)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)

    owner = db.relationship("User", back_populates='products')
    images = db.relationship("ProductImage", back_populates='product')
    cart_items = db.relationship('CartItem', back_populates='product')
    orders = db.relationship('Order', secondary=order_items, back_populates='products')
