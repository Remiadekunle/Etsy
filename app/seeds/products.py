from app.models import db, Product, User, environment, SCHEMA

def seed_products():
    owner = User.query.get(1)
    owner2 = User.query.get(2)
    owner3 = User.query.get(3)
    owner4 = User.query.get(4)
    owner5 = User.query.get(5)
    demo_products = [
    Product(
        name='Valorant 3D Forsaken Vandal', description='Forsaken Vandal', price=200, stock=20, options='green-white-gold', preview_img='https://i.imgur.com/UG5X4CA.png',
        owner=owner
    ),
    Product(
        name='Valorant 3D Prime Vandal', description='Prime Vandal', price=200, stock=20, options='gold-orange-blue-yellow', preview_img='https://i.imgur.com/zxdgzEM.png',
        owner=owner
    ),
    Product(
        name='Valorant 3D Prelude to Chaos Vandal', description='Prelude to Chaos Vandal', price=200, stock=20, options='blue-gray-purple-red', preview_img='https://i.imgur.com/eEKyFb9.png',
        owner=owner
    ),
    Product(
        name='Valorant 3D Gai\'s Vengance Vandal', description='Gai\'s Vengance Vandal', price=200, stock=20, options='gray-blue-green-red', preview_img='https://i.imgur.com/M4nfAn7.png',
        owner=owner
    ),
    Product(
        name='Valorant 3D RGX Vandal', description='RGX Vandal', price=200, stock=20, options='green-red-blue-gray', preview_img='https://i.imgur.com/FEuzkpG.png',
        owner=owner2
    ),
    Product(
        name='Valorant 3D Sentinels of Light Vandal', description='Sentinels of Light Vandal', price=200, stock=20, options='pink-purple-green-gold', preview_img='https://i.imgur.com/kKukvBp.png',
        owner=owner2
    ),
    Product(
        name='Valorant 3D Glitchpop Phantom', description='Glitchpop Phantom', price=200, stock=20, options='red-blue-yellow-purple', preview_img='https://i.imgur.com/qOKw0Lf.png',
        owner=owner2
    ),
    Product(
        name='Valorant 3D Oni Phantom', description='Oni Phantom', price=200, stock=20, options='red-green-yellow-teal', preview_img='https://i.imgur.com/o5Pas23.png',
        owner=owner2
    ),
    Product(
        name='Valorant 3D Prime Phantom', description='Prime Phantom', price=200, stock=20, options='gold-orange-blue-yellow', preview_img='https://i.imgur.com/sCvv43t.png',
        owner=owner3
    ),
    Product(
        name='Valorant 3D Recon Phantom', description='Recon Phantom', price=200, stock=20, options='gray-red-black', preview_img='https://i.imgur.com/pGZezdU.png',
        owner=owner3
    ),
    Product(
        name='Valorant 3D Reaver Vandal', description='Reaver Vandal', price=200, stock=20, options='purple-red-black-gray', preview_img='https://i.imgur.com/HfCCfch.png',
        owner=owner3
    ),
    Product(
        name='Valorant 3D Orrigin Vandal', description='Origin Vandal', price=200, stock=20, options='black-white-red-green', preview_img='https://i.imgur.com/lRgQopi.png',
        owner=owner3
    ),
    Product(
        name='COD Zombies Perks Bottle Replica', description='Perk bottle replica from call of duty black ops 3', price=200, stock=20, options='Juggernog-Speed Cola-Quick Revive-Stamin Up-Doulbe Tap-PHD Flopper- Widow\'s Wine', preview_img='https://static0.gamerantimages.com/wordpress/wp-content/uploads/2020/09/Black-Ops-Perks.jpg',
        owner=owner4
    ),
    Product(
        name='COD Zombies Gobble Gum Replica', description='Gobble gum replica from call of duty black ops 3', price=200, stock=20, options='Perkaholic-Anywhere but here-Raindrops-Unquenchable-Wall Power', preview_img='https://i.imgur.com/tPvMvEk.png',
        owner=owner4
    ),
    Product(
        name='COD Replica Optic Gaming Skin Figure', description='Figure modeled from call of duty black ops 3 Optic Gaming skin', price=150, stock=20, options='Small-Medium-Large-XL-2XL', preview_img='https://www.charlieintel.com/wp-content/uploads/2015/08/Screen-Shot-2015-08-01-at-11.01.13-AM.png',
        owner=owner4
    ),
    Product(
        name='COD Denial Skin Figure', description='Figure modeled from call of duty black ops 3 Denial Esports skin', price=150, stock=20, options='Small-Medium-Large-XL-2XL', preview_img='https://cdn.realsport101.com/images/ncavvykf/gfinityesports/44131efb6fed0a494795ddcf945f1b49dbed7ae0-744x433.png?rect=0,7,744,419&w=700&h=394&dpr=2',
        owner=owner4
    ),
    Product(
        name='COD Replica BAL-27 Skin', description='Gun modeled from call of duty advanced warfare gun', price=100, stock=20, options='Small-Medium-Large', preview_img='https://i.ytimg.com/vi/b7C_VovHQ4o/maxresdefault.jpg',
        owner=owner5
    ),
    Product(
        name='COD Replica M8A1', description='Gun modeled from call of duty black ops 2 gun', price=100, stock=20, options='Small-Medium-Large', preview_img='https://i.ytimg.com/vi/CETdQb-Qz5E/maxresdefault.jpg',
        owner=owner5
    ),
    Product(
        name='COD Replica PDW-57', description='Gun modeled from call of duty black ops 2 gun', price=100, stock=20, options='Small-Medium-Large', preview_img='https://i.ytimg.com/vi/MZyR0IEXIQ4/maxresdefault.jpg',
        owner=owner5
    ),
    Product(
        name='COD Replica NV4', description='Gun modeled from call of duty infinite warfare gun', price=100, stock=20, options='Small-Medium-Large', preview_img='https://i.ytimg.com/vi/2iJfXNsTh5Q/maxresdefault.jpg',
        owner=owner5
    ),
    Product(
        name='COD Replica ACR', description='Gun modeled from call of duty modern warfare 3 gun', price=100, stock=20, options='Small-Medium-Large', preview_img='https://www.safarasoftair.com/media/catalog/product/cache/2/image/4e9d4c756f3a2e58dc27e2c20629df0a/m/a/masada3_tn/www.safarasoftair.com-Aandk-ak-masada3-ras-tn-31.jpg',
        owner=owner5
    ),
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
