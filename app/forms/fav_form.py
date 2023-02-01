from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, IntegerField, BooleanField
from wtforms.validators import DataRequired

class FavForm(FlaskForm):
    product_id = IntegerField('product_id', validators=[DataRequired()])
