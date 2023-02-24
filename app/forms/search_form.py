from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField, IntegerField, BooleanField
from wtforms.validators import DataRequired

class SearchForm(FlaskForm):
    search = StringField('search', validators=[DataRequired()])
    price_incr = BooleanField('price_incr')
    price_decr = BooleanField('price_decr')
    highest_review = BooleanField('highest_review')
    most_recent = BooleanField('most_recent')
