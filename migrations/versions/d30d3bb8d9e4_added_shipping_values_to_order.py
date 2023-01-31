"""added shipping values to order

Revision ID: d30d3bb8d9e4
Revises: 9f58738fc49a
Create Date: 2023-01-28 21:12:58.378696

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'd30d3bb8d9e4'
down_revision = '9f58738fc49a'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('orders', sa.Column('address', sa.String(), nullable=True))
    op.add_column('orders', sa.Column('city', sa.String(), nullable=True))
    op.add_column('orders', sa.Column('state', sa.String(), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('orders', 'state')
    op.drop_column('orders', 'city')
    op.drop_column('orders', 'address')
    # ### end Alembic commands ###
