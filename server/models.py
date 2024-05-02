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
from flask_bcrypt import Bcrypt
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
class User(db.Model, SerializerMixin):
    __tablename__ = 'users'
    id=db.Column(db.Integer, unique=True, primary_key=True)
    username=db.Column(db.String, unique=True, nullable=False)
    _password=db.Column(db.String, nullable=False)

    @hybrid_property
    def password(self):
        return self._password
    
    #sets the new password into attribute _password
    @password.setter
    def password(self, new_password):
        pass_hash = bcrypt.generate_password_hash(new_password.decode('utf-8')) #decode the password into a binary string via utf-8. bcrypt encodes the password into a random string so it's not human readable in the database
        self._password = pass_hash.decode('utf-8')

    #checking password is valid when logging in
    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password, password.encode('utf-8'))


class Appointment(db.Model, SerializerMixin):
    __tablename__ = 'appointments'

    id=db.Column(db.Integer, primary_key=True)
    availability=db.Column(db.DateTime, nullable=False)
    barber_id=db.Column(db.Integer, db.ForeignKey('barbers.id'))

    # relationship with Barber
    barber = db.relationship('Barber', back_populates='appointments')
    serialize_rules=['-barber.appointments']

class Barber(db.Model, SerializerMixin):
    __tablename__ = 'barbers'

### TODO: generate QRcode for each barbershop that takes to their page for reviews

    id=db.Column(db.Integer, primary_key=True)
    name=db.Column(db.String, nullable=False)
    website=db.Column(db.String)
    street=db.Column(db.String, nullable=False)
    city=db.Column(db.String, nullable=False)
    state=db.Column(db.String, nullable=False)
    zip_code=db.Column(db.String, nullable=False)
    phone=db.Column(db.String)
    image=db.Column(db.String)
    created_at=db.Column(db.DateTime, server_default=db.func.now())

    # Add relationships
    reviews = db.relationship('Review', back_populates='barber', cascade='all, delete-orphan')

    # Add serialization rules
    serialize_rules = ['-reviews.barber', '-appointments.barber']

    # relationship with Appointment
    appointments = db.relationship('Appointment', back_populates='barber')

    @validates('phone')
    def validates_phone(self, key, new_phone):
        if len(new_phone) != 10 or not new_phone.isdigit():
            raise ValueError('Phone number must be 10 digits')
        return new_phone

    def __repr__(self):
        return f'<Barber: {self.name}, {self.address}, {self.phone}>'
    
######## TODO in priority #######

# Look into CALENDLY, GOOGLE Api for calendar for Appointment table
# <user> table that holds barber id or client to use for authentication
# <QR code> for each barber => front end

class Client(db.Model, SerializerMixin):
    __tablename__ = 'clients'

    id=db.Column(db.Integer, primary_key=True)
    name=db.Column(db.String, nullable=False)
    created_at=db.Column(db.DateTime, server_default=db.func.now())

    # Add relationships
    reviews = db.relationship('Review', back_populates='client')

    # Add serialization rules
    serialize_rules = ['-reviews.client']

    def __repr__ (self):
        return f'<Client: {self.name}, {self.created_at}>'
    

class Review(db.Model, SerializerMixin):
    __tablename__ = 'reviews'

### TODO: rating should only be between 1 - 5 per each user => implement stars with react
### TODO: each barber should have an overall rating which is their average
### TODO: total number of ratings

    id=db.Column(db.Integer, primary_key=True)
    created_at=db.Column(db.DateTime, server_default=db.func.now())
    updated_at=db.Column(db.DateTime, onupdate=db.func.now())
    rating=db.Column(db.Integer)
    message=db.Column(db.String(80))
    client_id=db.Column(db.Integer, db.ForeignKey('clients.id'))
    barber_id=db.Column(db.Integer, db.ForeignKey('barbers.id'))

    # Add relationships
    barber = db.relationship('Barber', back_populates='reviews')
    client = db.relationship('Client', back_populates='reviews')

    # Add serialization rules
    serialize_rules = ['-barber.reviews', '-client.reviews']

    @validates('message')
    def validate_length(self, key, string):
        if len(string) > 80:
            raise ValueError('Review must be less than 80 characters long')
        return string
    
    @validates('rating')
    def validate_rating(self, key, rating):
        return rating


    def __repr__(self):
        return f'<Review: {self.created_at}, {self.updated_at}, {self.updated_at}>'
