import os
from flask import Flask, request, session
from flask_migrate import Migrate
from flask_cors import CORS

from models import db, Barber, Client, Review


app = Flask(__name__)
# set the db connection string
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ['DATABASE_URI']
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# set a secret key (needed for browser cookies)
app.secret_key = os.environ['SECRET_KEY']

# initialize the sqlalchemy db
db.init_app(app)
# initialize alembic (migration framework)
Migrate(app, db)
# initialize CORS
CORS(app, supports_credentials=True)


if __name__ == '__main__':
    app.run(port=5555, debug=True)