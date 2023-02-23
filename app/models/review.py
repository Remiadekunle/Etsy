from .db import db, environment, SCHEMA, add_prefix_for_prod

class Review(db.Model):
    __tablename__ = 'reviews'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String, nullable=False)
    stars = db.Column(db.Integer, nullable=False)
    review_img = db.Column(db.String)
    created_at = db.Column(db.DateTime)
    updated_at = db.Column(db.DateTime)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('products.id')), nullable=False)

    user = db.relationship("User", back_populates='reviews')
    product = db.relationship("Product", back_populates='reviews')

    def to_dict(self):
        return {
            'id': self.id,
            'content': self.content,
            'stars': self.stars,
            'reviewImg': self.review_img,
            'userId': self.user_id,
            'productId': self.product_id,
            'username': self.user.username,
            'profileImg': self.user.profile_img,
            'time': self.updated_at
        }
