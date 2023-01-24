from .db import db, environment, SCHEMA, add_prefix_for_prod


order_items = db.Table(
    "order_items",
    db.Column('order_id', db.Integer, db.ForeignKey(add_prefix_for_prod('orders.id'))),
    db.Column('product_id', db.Integer, db.ForeignKey(add_prefix_for_prod('products.id')))
)

if environment == "production":
    order_items.schema = SCHEMA


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
    products = db.relationship("Product", secondary=order_items, back_populates='orders')
