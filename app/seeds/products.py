from app.models import db, Product, User, environment, SCHEMA, Category

def seed_products():
    owner = User.query.get(1)
    owner2 = User.query.get(2)
    owner3 = User.query.get(3)
    owner4 = User.query.get(4)
    owner5 = User.query.get(5)
    owner6 = User.query.get(6)
    owner7 = User.query.get(7)
    owner8 = User.query.get(8)
    owner9 = User.query.get(9)
    owner10 = User.query.get(10)
    valorant = Category.query.get(1)
    cod = Category.query.get(2)
    pokemon = Category.query.get(3)
    demo_products = [
    Product(
        name='Valorant 3D Forsaken Vandal', description='Forsaken Vandal', price=220, stock=20, options='green-white/gold', preview_img='https://i.imgur.com/UG5X4CA.png',
        owner=owner, category=valorant
    ),
    Product(
        name='Valorant 3D Prime Vandal', description='Prime Vandal', price=300, stock=20, options='gold-orange-blue-yellow', preview_img='https://i.imgur.com/zxdgzEM.png',
        owner=owner, category=valorant
    ),
    Product(
        name='Valorant 3D Prelude to Chaos Vandal', description='Prelude to Chaos Vandal', price=250, stock=20, options='blue-gray-purple-red', preview_img='https://i.imgur.com/eEKyFb9.png',
        owner=owner, category=valorant
    ),
    Product(
        name='Valorant 3D Gai\'s Vengance Vandal', description='Gai\'s Vengance Vandal', price=210, stock=20, options='gray-blue-green-red', preview_img='https://i.imgur.com/M4nfAn7.png',
        owner=owner, category=valorant
    ),
    Product(
        name='Valorant 3D RGX Vandal', description='RGX Vandal', price=220, stock=20, options='green-red-blue-gray', preview_img='https://i.imgur.com/FEuzkpG.png',
        owner=owner2, category=valorant
    ),
    Product(
        name='Valorant 3D Sentinels of Light Vandal', description='Sentinels of Light Vandal', price=210, stock=20, options='pink-purple-green-gold', preview_img='https://i.imgur.com/kKukvBp.png',
        owner=owner2, category=valorant
    ),
    Product(
        name='Valorant 3D Glitchpop Phantom', description='Glitchpop Phantom', price=200, stock=20, options='red-blue-yellow-purple', preview_img='https://i.imgur.com/qOKw0Lf.png',
        owner=owner2, category=valorant
    ),
    Product(
        name='Valorant 3D Oni Phantom', description='Oni Phantom', price=275, stock=20, options='red-green-yellow-teal', preview_img='https://i.imgur.com/o5Pas23.png',
        owner=owner2, category=valorant
    ),
    Product(
        name='Valorant 3D Prime Phantom', description='Prime Phantom', price=260, stock=20, options='gold-orange-blue-yellow', preview_img='https://i.imgur.com/sCvv43t.png',
        owner=owner3, category=valorant
    ),
    Product(

        name='Valorant 3D Recon Phantom', description='Recon Phantom', price=290, stock=20, options='gray-red', preview_img='https://i.imgur.com/pGZezdU.png',
        owner=owner3, category=valorant

    ),
    Product(
        name='Valorant 3D Reaver Vandal', description='Reaver Vandal', price=260, stock=20, options='purple-red-black-gray', preview_img='https://i.imgur.com/HfCCfch.png',
        owner=owner3, category=valorant
    ),
    Product(
        name='Valorant 3D Origin Vandal', description='Origin Vandal', price=230, stock=20, options='black-white-red-green', preview_img='https://i.imgur.com/lRgQopi.png',
        owner=owner3, category=valorant
    ),
    Product(
        name='COD Zombies Perks Bottle Replica', description='Perk bottle replica from call of duty black ops 3', price=200, stock=20, options='Juggernog-Speed Cola-Quick Revive-Stamin Up-Doulbe Tap-PHD Flopper- Widow\'s Wine', preview_img='https://static0.gamerantimages.com/wordpress/wp-content/uploads/2020/09/Black-Ops-Perks.jpg',
        owner=owner4, category=cod
    ),
    Product(
        name='COD Zombies Gobble Gum Replica', description='Gobble gum replica from call of duty black ops 3', price=200, stock=20, options='Perkaholic-Anywhere but here-Raindrops-Unquenchable-Wall Power', preview_img='https://i.imgur.com/tPvMvEk.png',
        owner=owner4, category=cod
    ),
    Product(
        name='COD Replica Optic Gaming Skin Figure', description='Figure modeled from call of duty black ops 3 Optic Gaming skin', price=250, stock=20, options='Small-Medium-Large-XL-2XL', preview_img='https://www.charlieintel.com/wp-content/uploads/2015/08/Screen-Shot-2015-08-01-at-11.01.13-AM.png',
        owner=owner4, category=cod
    ),
    Product(
        name='COD Denial Skin Figure', description='Figure modeled from call of duty black ops 3 Denial Esports skin', price=150, stock=20, options='Small-Medium-Large-XL-2XL', preview_img='https://cdn.realsport101.com/images/ncavvykf/gfinityesports/44131efb6fed0a494795ddcf945f1b49dbed7ae0-744x433.png?rect=0,7,744,419&w=700&h=394&dpr=2',
        owner=owner4, category=cod
    ),
    Product(

        name='COD Replica BAL-27 Skin', description='Gun modeled from call of duty advanced warfare gun', price=170, stock=20, options='Small-Large', preview_img='https://i.ytimg.com/vi/b7C_VovHQ4o/maxresdefault.jpg',
        owner=owner5, category=cod
    ),
    Product(
        name='COD Replica M8A1', description='Gun modeled from call of duty black ops 2 gun', price=180, stock=20, options='Small-Large', preview_img='https://i.ytimg.com/vi/CETdQb-Qz5E/maxresdefault.jpg',
        owner=owner5, category=cod
    ),
    Product(
        name='COD Replica PDW-57', description='Gun modeled from call of duty black ops 2 gun', price=150, stock=20, options='Small-Large', preview_img='https://i.ytimg.com/vi/MZyR0IEXIQ4/maxresdefault.jpg',
        owner=owner5, category=cod
    ),
    Product(
        name='COD Replica NV4', description='Gun modeled from call of duty infinite warfare gun', price=170, stock=20, options='Small-Large', preview_img='https://i.ytimg.com/vi/2iJfXNsTh5Q/maxresdefault.jpg',
        owner=owner5, category=cod
    ),
    Product(
        name='COD Replica ACR', description='Gun modeled from call of duty modern warfare 3 gun', price=180, stock=20, options='Small-Large', preview_img='https://www.safarasoftair.com/media/catalog/product/cache/2/image/4e9d4c756f3a2e58dc27e2c20629df0a/m/a/masada3_tn/www.safarasoftair.com-Aandk-ak-masada3-ras-tn-31.jpg',
        owner=owner5, category=cod
    ),
    Product(
        name='Valorant Sova Bow', description='Sova bow made from Valorant', price=100, stock=20, options='Small-Large', preview_img='https://i.etsystatic.com/25116497/r/il/0f27f5/3102364325/il_fullxfull.3102364325_k281.jpg',
        owner=owner6, category=valorant
    ),
    Product(
        name='Valorant Raze Boom Bot', description='Raze Boom Bot made from Valorant', price=80, stock=20, options='Small-Large', preview_img='https://cdna.artstation.com/p/assets/images/images/049/124/918/large/zuzanna-kossowska-ren1.jpg?1651750071',
        owner=owner6, category=valorant
    ),
    Product(
        name='Valorant Spike Replica', description='Spike replica made from Valorant', price=50, stock=20, options='Small-Large', preview_img='https://www.3dtrophyfactory.com/wp-content/uploads/2020/11/Spike-concept-2.jpg',
        owner=owner6, category=valorant
    ),
    Product(
        name='Valorant Killjoy Alarm', description='Alarm bot made from Valorant', price=75, stock=20, options='Small-Large', preview_img='https://www.pcgamesn.com/wp-content/uploads/2020/08/killjoy-alarm-bot.jpeg',
        owner=owner6, category=valorant
    ),
    Product(
        name='COD Replica Ray Gun', description='Gun modeled from call of duty B02 zombies', price=150, stock=20, options='Small-Large', preview_img='https://i.ytimg.com/vi/Tlsor4l9JhA/maxresdefault.jpg',
        owner=owner7, category=cod
    ),
    Product(
        name='COD Replica Elemental Staffs', description='Gun modeled from call of duty B02 zombies', price=125, stock=20, options='Ice-Wind-Fire-Lightning', preview_img='https://i.pinimg.com/originals/ea/96/7f/ea967fdac929275e9527d4db280eb0d9.jpg',
        owner=owner7, category=cod
    ),
    Product(
        name='COD Replica Vending Machines', description='Vending machione from call of duty BO2/BO3 zombies', price=300, stock=20, options='Juggernog-Speed Cola-Quick Revive-Stamin Up-Doulbe Tap-PHD Flopper- Widow\'s Wine-Electric Cherry', preview_img='https://files.cults3d.com/uploaders/16235602/illustration-file/24499c43-e309-48b0-882c-b10666c391aa/All-Perks-Front.png',
        owner=owner7, category=cod
    ),
    Product(
        name='COD Replica Summong Key', description='Key from call of duty B03 zombies', price=150, stock=20, options='Small-Large' , preview_img='https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/5c79022a-643d-487c-85ce-18e39148718c/dafjxyl-81fb2605-1350-4575-a05c-b8409a12568f.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzVjNzkwMjJhLTY0M2QtNDg3Yy04NWNlLTE4ZTM5MTQ4NzE4Y1wvZGFmanh5bC04MWZiMjYwNS0xMzUwLTQ1NzUtYTA1Yy1iODQwOWExMjU2OGYucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.n9SzmQm3NLmQgDvmj9EZLReG71_u2wHCgM-scosTfls',
        owner=owner7, category=cod
    ),
    Product(
        name='COD Replica Mystery Box', description='Mystery box from call of duty B03 zombies', price=200, stock=20, options='Small-Large' , preview_img='https://www.charlieintel.com/wp-content/uploads/2021/07/All-Mauer-Der-Toten-mystery-box-locations.jpg',
        owner=owner8, category=cod
    ),
    Product(
        name='COD Replica Elemental Bows', description='Bows from call of duty B03 zombies', price=200, stock=20, options='Small-Large' , preview_img='https://pm1.narvii.com/6453/642f20155308cd84327a2b2d58d0b1575313d423_hq.jpg',
        owner=owner8, category=cod
    ),
    Product(
        name='Pokemon Master Ball Replica', description='Master ball from the pokemon videogames', price=100, stock=20, options='Small-medium-Large' , preview_img='https://www.gamebyte.com/wp-content/uploads/2019/03/master-ball-pokemon-lets-go-2_feature.jpg',
        owner=owner8, category=pokemon
    ),
    Product(
        name='Pokemon Pikachu Plushie Replica', description='Plushie from the pokemon videogames', price=120, stock=20, options='Small-medium-Large' , preview_img='https://g5j7v8q8.stackpathcdn.com/wp-content/uploads/2022/08/Pokemon-Sleeping-Gosedjur-Pikachu-1.jpg',
        owner=owner8, category=pokemon
    ),
    Product(
        name='Pokemon Eevee Plushie Replica', description='Plushie from the pokemon videogames', price=120, stock=20, options='Small-medium-Large' , preview_img='https://i.pinimg.com/originals/71/9c/e4/719ce40c64716db52d648f7766dd0031.jpg',
        owner=owner9, category=pokemon
    ),
    Product(
        name='Pokemon Charmander Plushie Replica', description='Plushie from the pokemon videogames', price=120, stock=20, options='Small-medium-Large' , preview_img='https://cdn11.bigcommerce.com/s-urahz4qi23/images/stencil/1280x1280/products/1486/2678/vdd_1200x1200__99527.1638143288.png?c=1',
        owner=owner9, category=pokemon
    ),
    Product(
        name='Pokemon Mew Plushie Replica', description='Plushie from the pokemon videogames', price=120, stock=20, options='Small-medium-Large' , preview_img='https://www.pokemoncenter.com/images/DAMRoot/High/10000/P5517_701-04636_01.jpg',
        owner=owner9, category=pokemon
    ),
    Product(
        name='Pokemon Lucario Plushie Replica', description='Plushie from the pokemon videogames', price=120, stock=20, options='Small-medium-Large' , preview_img='https://i5.walmartimages.com/asr/bfa01889-137c-4e94-9562-aec3c8cc996c.014a5592f5e4e544bb7c3e1dd883a627.jpeg',
        owner=owner9, category=pokemon
    ),
    Product(
        name='Pokemon Charizard Plushie Replica', description='Plushie from the pokemon videogames', price=120, stock=20, options='Small-medium-Large' , preview_img='https://m.media-amazon.com/images/I/51dnMAqGy9L.jpg',
        owner=owner8, category=pokemon
    ),
    Product(
        name='Pokemon Arceus Plushie Replica', description='Plushie from the pokemon videogames', price=120, stock=20, options='Small-medium-Large' , preview_img='https://cdn.shopify.com/s/files/1/1145/4632/products/8b24e1759ebe4f3e0d39c4f3340c0401_2048x.jpg?v=1650349995',
        owner=owner8, category=pokemon
    ),
    Product(
        name='Pokemon Greninja Plushie Replica', description='Plushie from the pokemon videogames', price=120, stock=20, options='Small-medium-Large' , preview_img='https://m.media-amazon.com/images/I/817+ZnO7QwL.jpg',
        owner=owner8, category=pokemon
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
