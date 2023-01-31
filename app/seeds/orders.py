from app.models import db, Product, User, environment, SCHEMA, Order, OrderItem
from datetime import datetime, timedelta
from random import choice

def seed_orders():
    user = User.query.get(1)
    orders = [
        Order(
            user=user,
            address='123  Westpoint Lane',
            city='Central City',
            state='Ohio',
            created_at=datetime(2023, 1, 19),
            expires=datetime(2023, 1, 13),
            delivery=datetime(2023, 1, 27),
            total=400
        ),
        Order(
            user=user,
            address='123  Westpoint Lane',
            city='Central City',
            state='Ohio',
            created_at=datetime(2023, 1, 19),
            expires=datetime(2023, 1, 29),
            delivery=datetime(2023, 2, 10),
            total=400
        ),
        Order(
            user=user,
            address='123  Westpoint Lane',
            city='Central City',
            state='Ohio',
            created_at=datetime(2023, 1, 19),
            expires=datetime(2023, 1, 25),
            delivery=datetime(2023, 1, 29),
            total=400
        ),
    ]

    options = [1,5,10,8,6]

    for order in orders:
        product = Product.query.get(10)
        order_item = OrderItem(
            quantity=2,
            option='white',
            order=order,
            product=product
        )
        db.session.add(order_item)
        db.session.add(order)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_orders():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.orders RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.order_items RESTART IDENTITY CASCADE;")


    else:
        db.session.execute("DELETE FROM orders")
        db.session.execute("DELETE FROM order_items")

    db.session.commit()
