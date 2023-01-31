"""created notes attribute for Orderrs

Revision ID: 2544f0d072ff
Revises: d30d3bb8d9e4
Create Date: 2023-01-30 17:17:48.866831

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '2544f0d072ff'
down_revision = 'd30d3bb8d9e4'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('orders', sa.Column('notes', sa.String(), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('orders', 'notes')
    # ### end Alembic commands ###