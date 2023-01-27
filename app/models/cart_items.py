from .db import db, environment, SCHEMA, add_prefix_for_prod

class CartItem(db.Model):
    __tablename__ = 'cart_items'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    quantity = db.Column(db.Integer, nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('products.id')), nullable=False)
    cart_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('carts.id')), nullable=False)
    option = db.Column(db.String)

    cart = db.relationship("Cart", back_populates='items')
    product = db.relationship("Product", back_populates='cart_items')

    def to_dict(self):
        return {
            'id': self.id,
            'quantity': self.quantity,
            'product': self.product.id,
            'option': self.option
            # 'cart': [cart.id for cart in self.cart],
            # 'orders': [order.id for order in self.orders]
        }
