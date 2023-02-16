from .db import db, environment, SCHEMA, add_prefix_for_prod
from .user import favorites
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
    category_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('categories.id')))

    owner = db.relationship("User", back_populates='products')
    cart_items = db.relationship('CartItem', back_populates='product')
    orders = db.relationship('OrderItem', back_populates='product')
    reviews = db.relationship('Review', back_populates='product')
    faved_users = db.relationship('User', secondary=favorites, back_populates='favorites')
    category = db.relationship("Category", back_populates='products')
    def review_avg(self):
        reviews = [review.stars for review in self.reviews]
        if len(reviews) < 1:
            return  0
        avg = 0
        for review in reviews:
            avg = avg + review
        return float(avg/len(reviews))

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'price': float(self.price),
            'stock': self.stock,
            'options': self.options,
            'previewImg': self.preview_img,
            'owner': self.owner.to_dict2(),
            'reviews': [review.to_dict() for review in self.reviews],
            'avg': self.review_avg(),
            'faved_user': [user.id for user in self.faved_users],
            'categoryId': self.category.id if self.category else 0,
            'recs': list(set([product.id for product in self.category.get_recs() if not product.id == self.id])) if self.category else []
        }
    def to_fav(self):
        return {
            'id': self.id,
            'name': self.name,
            'price': float(self.price),
            'previewImg': self.preview_img,
            'owner': self.owner.username,
        }
