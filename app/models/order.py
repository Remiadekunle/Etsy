from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime, timedelta


class Order(db.Model):
    __tablename__ = 'orders'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    total = db.Column(db.Float(5, 2), default=1.0, nullable=False)
    created_at = db.Column(db.DateTime)
    updated_at = db.Column(db.DateTime)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    address = db.Column(db.String)
    city = db.Column(db.String)
    state = db.Column(db.String)
    notes = db.Column(db.String)
    expires = db.Column(db.DateTime)
    delivery = db.Column(db.DateTime)

    user = db.relationship("User", back_populates='orders')
    items = db.relationship("OrderItem", back_populates='order')
    def to_dict(self):
        return {
            'id': self.id,
            'total': float(self.total),
            # 'products': [product.id for product in self.products],
            'items': [item.to_dict() for item in self.items],
            'address': self.address,
            'city': self.city,
            'state': self.state,
            'created_at': f'{self.created_at}'.split(' ')[0],
            'updated_at': f'{self.updated_at}'.split(' ')[0],
            'preview_img':self.items[0].product.preview_img if self.items else [],
            'preview_item':self.items[0].product.to_dict() if self.items else {},
            'notes': self.notes,
            'full_created': self.created_at,
            'expires':self.expires,
            'delivery_expires':self.delivery,
            'deliver_date': self.delivery + timedelta(days=4) if self.delivery else ''
            # 'orders': [order.id for order in self.orders]
        }
