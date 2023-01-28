from app.models import db, Product, User, environment, SCHEMA

def seed_products():
    owner = User.query.get(1)
    demo_products = [
    Product(
        name='Valorant 3D printed gun', description='Forsaken Vandal', price=200, stock=20, options='red-blue-pink', preview_img='https://i.imgur.com/UG5X4CA.png',
        owner=owner
    ),
    Product(
        name='Valorant 3D printed gun', description='Prime Vandal', price=200, stock=20, options='red-blue-pink', preview_img='https://i.imgur.com/zxdgzEM.png',
        owner=owner
    ),
    Product(
        name='Valorant 3D printed gun', description='Prelude to Chaos Vandal', price=200, stock=20, options='red-blue-pink', preview_img='https://i.imgur.com/eEKyFb9.png',
        owner=owner
    ),
    Product(
        name='Valorant 3D printed gun', description='Gai\'s Vengance Vandal', price=200, stock=20, options='red-blue-pink', preview_img='https://i.imgur.com/M4nfAn7.png',
        owner=owner
    ),
    Product(
        name='Valorant 3D printed gun', description='RGX Vandal', price=200, stock=20, options='red-blue-pink', preview_img='https://i.imgur.com/FEuzkpG.png',
        owner=owner
    )
    ]

    for product in demo_products:
        db.session.add(product)
    db.session.commit()



def undo_products():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM products")

    db.session.commit()
