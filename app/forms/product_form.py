from flask_wtf import FlaskForm
from wtforms import StringField, FloatField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError



class ProductForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    description = StringField('description', validators=[DataRequired()])
    price = FloatField('price', validators=[DataRequired()])
    stock = IntegerField('stock', validators=[DataRequired()])
    options = StringField('options', validators=[DataRequired()])
    preview_img = StringField('preview_img')
