from app.models import db, Product, User, environment, SCHEMA, Order, OrderItem, Category
from datetime import datetime, timedelta
from random import choice

def seed_categories():

    categories = [
        Category(
        title='Valorant',
        description='Valorant is a tactical shooting game involving two teams \
        with 5 players in each team. Every player can sign in and play remotely \
        from anywhere in the world. Every game has 25 rounds and the team that wins \
        13 of them first wins the game. Players can choose their in-game characters called agents at the start of the game'
        ),
        Category(
        title='Call of Duty',
        description='Valorant is a tactical shooting game involving two teams \
        with 5 players in each team. Every player can sign in and play remotely \
        from anywhere in the world. Every game has 25 rounds and the team that wins \
        13 of them first wins the game. Players can choose their in-game characters called agents at the start of the game'
        ),
        Category(
        title='Pokemon',
        description='Call of Duty is a first-person shooter video game franchise published by Activision. \
            Starting out in 2003, it first focused on games set in World War II. Over time, the series has seen \
                games set in the midst of the Cold War, futuristic worlds, and the modern day. The games were first \
                    developed by Infinity Ward, then also by Treyarch and Sledgehammer Games. Several spin-off and handheld \
                        games were made by other developers. The most recent title, Call of Duty: Modern Warfare II, was \
                            released on October 28, 2022.'
        ),
    ]


    for category in categories:
        db.session.add(category)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_categories():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.categories RESTART IDENTITY CASCADE;")


    else:
        db.session.execute("DELETE FROM categories")

    db.session.commit()
