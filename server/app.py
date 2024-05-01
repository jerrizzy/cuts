"""
To install flask. Do in terminal:

pipenv install
   pipenv install flask
   pipenv install flask-sqlalchemy
   pipenv install flask-migrate
   pipenv install python-dotenv
   pipenv install sqlalchemy-serializer
   pipenv install flask-bcrypt
   pipenv install flask-cors
"""

import os
from flask import Flask, request, session
from flask_migrate import Migrate
from flask_cors import CORS

from models import db, Barber, Client, Review


app = Flask(__name__)
# set the db connection string
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

# set a secret key (needed for browser cookies)
app.secret_key = b'Y\xf1Xz\x00\xad|eQ\x80t \xca\x1a\x10K'

# initialize the sqlalchemy db
db.init_app(app)
# initialize alembic (migration framework)
Migrate(app, db)
# initialize CORS
CORS(app, supports_credentials=True)

@app.route('/')
def root():
    return '<h1>Yo</h1>'

@app.route('/barbers', methods = ['GET', 'POST'])
def get_barbers():
    # query db for all barber objs
    barbers = Barber.query.all()
    if request.method == 'GET':
        # map every barber obj to a barber dictionary
        return [barber.to_dict() for barber in barbers], 200
    
    elif request.method == 'POST':
        # get the json data from the request body
        json_data = request.get_json()

        # build new barber obj using info from json_data
        try:
            new_barber = Barber(
                name=json_data.get('name'),
                address=json_data.get('address'),
                phone=json_data.get('phone'),
                image=json_data.get('image'),
                )
        except ValueError as e:
            return {'errors': ['validation errors']}, 400
        
        # save to db
        db.session.add(new_barber)
        db.session.commit()
        
        # return a response
        return new_barber.to_dict(), 201


@app.route('/barbers/<int:id>', methods=['GET', 'PATCH', 'DELETE'])
def barbers_by_id(id):
    barber_obj = Barber.query.filter(Barber.id == id).first()
    if not barber_obj:
        return {'error': 'barber not found'}, 404
    
    if request.method == 'GET':
        return barber_obj.to_dict(), 200
    
    elif request.method == 'PATCH':
        json_data = request.get_json()

        # update the barber obj with the new data #
        # goes through each key in the json_data object
        for field in json_data:
            value = json_data[field] # gets the value for each key, and passes it in variable value
            setattr(barber_obj, field, value) # takes barber_obj and sets the new value to its key

        db.session.add(barber_obj)
        db.session.commit()

        return barber_obj, 200
    
    elif request.method == 'DELETE':
        # delete dog from the db
        db.session.delete(barber_obj)
        db.session.commit()

        return {}, 204
    
@app.route('/barbers/<string:name>', methods=['GET'])
def barbers_by_name(name):
    barber_obj = Barber.query.filter(Barber.name == name).first()
    if not barber_obj:
        return {'error': 'barber not found'}, 404
    return barber_obj.to_dict(), 200
    

@app.route('/clients', methods=['GET', 'POST'])
def get_clients():
    clients = Client.query.all()
    if request.method == 'GET':
        return [client.to_dict() for client in clients], 200
    
    elif request.method == 'POST':
        json_data = request.get_json()

        # add validation
        new_client = Client(
            name=json_data.get('name')
        )
        db.session.add(new_client)
        db.session.commit()

        return new_client.to_dict(), 201
    
@app.route('/clients/<int:id>', methods=['GET', 'PATCH', 'DELETE'])
def clients_by_id(int):
    client_obj = Client.query.filter(Client.id == id).first()
    if not client_obj:
        return {'error', 'client not found'}, 404
    
    if request.method == 'GET':
        return client_obj.to_dict(), 200
    
    elif request.method == 'PATCH':
        json_data = request.get_json()

        for field in json_data:
            value = json_data[field]
            setattr(client_obj, field, value)

        db.session.add(client_obj)
        db.session.commit()

        return client_obj.to_dict(), 200
    
    elif request.method == 'DELETE':
        db.session.delete(client_obj)
        db.session.commit()
        return {}, 204
        
@app.route('/reviews', methods=['POST'])
def reviews():
    if request.method == 'POST':
        json_data = request.get_json()
        print(json_data)

        try:
            new_review = Review(
                rating=json_data.get('rating'),
                message=json_data.get('message'),
                barber_id=json_data.get('barber_id'),
                client_id=json_data.get('client_id')
            )
        except ValueError as e:
            return {'errors': ['validation errors']}, 400
        
        db.session.add(new_review)
        db.session.commit()

        return new_review.to_dict(), 201


if __name__ == '__main__':
    app.run(port=5555, debug=True)