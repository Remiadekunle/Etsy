from flask_wtf import FlaskForm
from wtforms import StringField, FloatField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError



class ReviewForm(FlaskForm):
    content = StringField('content', validators=[DataRequired()])
    stars = IntegerField('stars', validators=[DataRequired()])
    img = StringField('img')
    # product_id = IntegerField('id', validators=[DataRequired()])
