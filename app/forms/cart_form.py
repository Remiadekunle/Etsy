from flask_wtf import FlaskForm
from wtforms import StringField, FloatField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError



class CartForm(FlaskForm):
    product_id = IntegerField('id', validators=[DataRequired()])
    quantity = IntegerField('quantity', validators=[DataRequired()])
    option = StringField('option', validators=[DataRequired()])
