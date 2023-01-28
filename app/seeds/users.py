from app.models import db, User, environment, SCHEMA, Cart


# Adds a demo user, you can add other users here if you want
def seed_users():
    users = [
        User(
            username='Demo', email='demo@aa.io', password='password'),
        User(
            username='Reyna', email='reyna@aa.io', password='password'),
        User(
            username='Raze', email='raze@aa.io', password='password'),
        User(
            username='Omen', email='omen@aa.io', password='password'),
        User(
            username='Takeo', email='takeo@aa.io', password='password'),
        User(
            username='Richtofen ', email='richtofen@aa.io', password='password'),
        User(
            username='Asta', email='asta@aa.io', password='password'),
        User(
            username='Noelle', email='noelle@aa.io', password='password'),
        User(
            username='Kakashi', email='kakashi@aa.io', password='password'),
        User(
            username='Zoro', email='zoro@aa.io', password='password'),
    ]

    for user in users:
        cart = Cart(
            user=user,
            total=0
        )
        db.session.add(user)
        db.session.add(cart)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.cart_items RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.carts RESTART IDENTITY CASCADE;")

    else:
        db.session.execute("DELETE FROM users")
        db.session.execute("DELETE FROM cart_items")
        db.session.execute("DELETE FROM carts")

    db.session.commit()
