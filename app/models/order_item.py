from .db import db, environment, SCHEMA, add_prefix_for_prod

class OrderItem(db.Model):
    __tablename__ = 'order_items'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    quantity = db.Column(db.Integer, nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('products.id')), nullable=False)
    order_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('orders.id')), nullable=False)
    option = db.Column(db.String)

    order = db.relationship("Order", back_populates='items')
    product = db.relationship("Product", back_populates='orders')

    def to_dict(self):
        return {
            'id': self.id,
            'quantity': self.quantity,
            'product_id': self.product_id,
            'name': self.product.name,
            'price':float(self.product.price)
        }
