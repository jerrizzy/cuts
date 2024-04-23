"""
To create db:

flask db init  # creates the migration folder (only need to run this once)
flask db migrate -m 'some message'  # creates the revision file
flask db upgrade  # apply db changes from revision file
"""


from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from sqlalchemy import MetaData
# from flask_bcrypt import Bcrypt
from sqlalchemy.ext.hybrid import hybrid_property


convention = {
    "ix": "ix_%(column_0_label)s",
    "uq": "uq_%(table_name)s_%(column_0_name)s",
    "ck": "ck_%(table_name)s_%(constraint_name)s",
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    "pk": "pk_%(table_name)s"
}

db = SQLAlchemy(metadata=MetaData(naming_convention=convention))
bcrypt = Bcrypt()


#table models
class Barber(db.Model):
    __tablename__ = 'barbers'

    id=db.Column(db.Integer, primary_key=True)
    name=db.Column(db.String, nullable=False)
    address=db.Column(db.String)
    phone=db.Column(db.String)
    image=db.Column(db.String)
    created_at=db.Column(db.Date)

    def __repr__(self):
        return f'<Barber: {self.name}, {self.address}, {self.phone}'
    
######## TODO in priority #######
# Routes: get all Barbers 
# get BArbers by id 
# a Barber can post, patch, delete from his account
# get all clients
# a Client can post, patch, delete

# <Appointment schedule> table related to barber table coming later. Look into CALENDLY, GOOGLE Api for calendar
# <user> table that holds barber id or client to use for authentication
# <QR code> for each barber => front end


class Client(db.Model):
    __tablename__ = 'clients'

    id=db.Column(db.Integer, primary_key=True)
    name=db.Column(db.String, nullable=False)
    created_at=db.Column(db.Date)

    def __repr__ (self):
        return f'<Client: {self.name}, {self.created_at}>'
    

class Review(db.Model):
    __tablename__ = 'reviews'

    id=db.Column(db.Integer, primary_key=True)
    created_at=db.Column(db.Datetime)
    updated_at=db.Column(db.Datetime)
    rating=db.Column(db.Integer)
    client_id=db.Column(db.Integer, db.ForeignKey('clients.id'))
    barber_id=db.Column(db.Integer, db.ForeignKey('barbers.id'))

    def __repr__(self):
        return f'<Review: {self.created_at}, {self.updated_at}, {self.updated_at}>'
    