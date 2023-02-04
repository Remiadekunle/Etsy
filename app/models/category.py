from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime, timedelta
from random import randint

class Category(db.Model):
    __tablename__ = 'categories'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.Integer, nullable=False)
    description = db.Column(db.String(2000))

    products = db.relationship("Product", back_populates='category')

    def get_recs(self):
        products = self.products
        # res2 = choices(products, k=6)
        res = []
        for i in range(8):
            idx = randint(0, len(products) - 1)
            res.append(products[idx])
        return res
    def to_dict(self):
        return {
            'id': self.id,
            'products': [product.to_dict() for product in self.products]
        }
