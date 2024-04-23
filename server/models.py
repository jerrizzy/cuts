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
from sqlalchemy import DateTime
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
# bcrypt = Bcrypt()


#table models
class Barber(db.Model):
    __tablename__ = 'barbers'

    id=db.Column(db.Integer, primary_key=True)
    name=db.Column(db.String, nullable=False)
    address=db.Column(db.String, nullable=False)
    phone=db.Column(db.String)
    image=db.Column(db.String)
    created_at=db.Column(db.Date)

    # Add relationships
    reviews = db.relationship('Review', back_populates='barber')

    # Add serialization rules
    serialize_rules = ['-reviews.barber']

    def __repr__(self):
        return f'<Barber: {self.name}, {self.address}, {self.phone}>'
    
######## TODO in priority #######
# Routes: should I create routes for Review table

# <Appointment schedule> table related to barber table coming later. Look into CALENDLY, GOOGLE Api for calendar
# <user> table that holds barber id or client to use for authentication
# <QR code> for each barber => front end


class Client(db.Model):
    __tablename__ = 'clients'

    id=db.Column(db.Integer, primary_key=True)
    name=db.Column(db.String, nullable=False)
    created_at=db.Column(db.Date)

    # Add relationships
    reviews = db.relationship('Review', back_populates='client')

    # Add serialization rules
    serialize_rules = ['-reviews.client']

    def __repr__ (self):
        return f'<Client: {self.name}, {self.created_at}>'
    

class Review(db.Model):
    __tablename__ = 'reviews'

    id=db.Column(db.Integer, primary_key=True)
    created_at=db.Column(db.DateTime)
    updated_at=db.Column(db.DateTime)
    rating=db.Column(db.Integer)
    body=db.Column(db.String)
    client_id=db.Column(db.Integer, db.ForeignKey('clients.id'))
    barber_id=db.Column(db.Integer, db.ForeignKey('barbers.id'))

    # Add relationships
    barber = db.relationship('Barber', back_populates='reviews')
    client = db.relationship('Client', back_populates='reviews')

    # Add serialization rules
    serialize_rules = ['-barber.reviews', '-client.reviews']

    def __repr__(self):
        return f'<Review: {self.created_at}, {self.updated_at}, {self.updated_at}>'
    