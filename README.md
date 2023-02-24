# Besty

Welcome to Besty!  Start today by clicking the link below!

### Live Site: [Besty](https://besty-5c2u.onrender.com)

*Please note the site may take a few minutes to start up due to the platform it is deployed on.*

# 🔗 Wiki Links
- [Database Schema](https://github.com/Remiadekunle/Etsy/wiki/Database-Schema)
- [Feature List](https://github.com/Remiadekunle/Etsy/wiki/Feature-List)
- [User Stories](https://github.com/Remiadekunle/Etsy/wiki/User-Stories)

# 💻📚 Tech Stack

## Frameworks, Platforms, and Libraries:

![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![Flask](https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
![Socket.io](https://img.shields.io/badge/Socket.io-010101?&style=for-the-badge&logo=Socket.io&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
- Flask SQL Alchemy
- Flask Alembic

## Database:

![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)

## Hosting:

![Render](https://img.shields.io/badge/Render-%46E3B7.svg?style=for-the-badge&logo=render&logoColor=white)

# 👷 Engineer
- Remi Adekunle [GitHub](https://github.com/Remiadekunle)


# 🔍 Get Started on my Server!

<img width="2000" alt="home page" src="https://i.imgur.com/mvmTHpz.png">

You can start by clicking on the profile button located in the navbar to either log in or sign up for an account. You can also log in as a demo user.

<img width="2000" alt="log in page" src="https://i.imgur.com/xBwkfGo.png">

After logging in you can create start by creating a product by clicking the create new product button in the navigation bar on the right of the screen.

<img width="2000" alt="create server" src="https://i.imgur.com/f3QzOX7.png">

After product creation, you can start commenting on the product or the product to your cart. If you are on a product that is owned by you. You are able to edit the product's information or delete the product.

<img width="2000" alt="edit server modal" src="https://i.imgur.com/xQ4aN09.png">

Once in the cart, you can purchase the item by clicking the place order button.

<img width="2000" alt="@me dms page" src="https://i.imgur.com/ShlulRN.png">

When you are ready to log out you can click your profile button located in the navbar then click the Log Out button.


# 🖥️ Get Started Locally!
1. Clone this repository (only this branch)

2. Install dependencies

      ```bash
      pipenv install -r requirements.txt
      ```

3. Create a **.env** file based on the example with proper settings for your
   development environment

4. Make sure the SQLite3 database connection URL is in the **.env** file

5. This starter organizes all tables inside the `flask_schema` schema, defined
   by the `SCHEMA` environment variable.  Replace the value for
   `SCHEMA` with a unique name, **making sure you use the snake_case
   convention**.

6. Get into your pipenv, migrate your database, seed your database, and run your Flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

7. To run the React App in development, checkout the [README](./react-app/README.md) inside the `react-app` directory.
