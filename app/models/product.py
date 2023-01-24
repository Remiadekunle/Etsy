from .db import db, environment, SCHEMA, add_prefix_for_prod

class Product(db.Model):
    __tablename__ = 'products'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(200), nullable=False)
    price = db.Column(db.Float(5, 2), default=1.0, nullable=False)
    stock = db.Column(db.Integer, nullable=False)
    options = db.Column(db.String(500), nullable=False)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    preview_img = db.Column(db.String, nullable=False)

    owner = db.relationship("User", back_populates='products')
    cart_items = db.relationship('CartItem', back_populates='product')
    order_items = db.relationship('OrderItem', back_populates='product')
