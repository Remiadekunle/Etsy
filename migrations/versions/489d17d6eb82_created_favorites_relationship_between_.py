"""created favorites relationship between users and products

Revision ID: 489d17d6eb82
Revises: 0c2792482bf5
Create Date: 2023-02-01 14:31:29.166184

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '489d17d6eb82'
down_revision = '0c2792482bf5'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('favorites',
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('product_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['product_id'], ['products.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], )
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('favorites')
    # ### end Alembic commands ###
