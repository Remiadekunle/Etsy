from .db import db, environment, SCHEMA, add_prefix_for_prod



class Order(db.Model):
    __tablename__ = 'orders'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    total = db.Column(db.Float(5, 2), default=1.0, nullable=False)
    created_at = db.Column(db.DateTime)
    updated_at = db.Column(db.DateTime)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)

    user = db.relationship("User", back_populates='orders')
    items = db.relationship("OrderItem", back_populates='order')
    def to_dict(self):
        return {
            'id': self.id,
            'total': float(self.total),
            # 'products': [product.id for product in self.products],
            'items': [item.to_dict() for item in self.items],
            # 'orders': [order.id for order in self.orders]
        }
