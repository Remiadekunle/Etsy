from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime)
    profile_img = db.Column(db.String(2000))

    products = db.relationship("Product", back_populates="owner")
    cart = db.relationship("Cart", uselist=False, back_populates="user")
    orders = db.relationship('Order', back_populates='user')

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            # 'products': [product.id for product in self.products],
            'cart': self.cart.to_dict(),
            # 'orders': [order.id for order in self.orders]
        }
    def to_dict2(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'profile': self.profile_img,
            'products': [product.id for product in self.products],
            # 'cart': self.cart.to_dict(),
            # 'orders': [order.id for order in self.orders]
        }
