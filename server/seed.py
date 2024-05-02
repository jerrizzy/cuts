import random
from app import app
from models import db, Barber, Client, Review, User
from faker import Faker

fake = Faker()

def run():

    # delete all barbers from dogs table
    print('deleting all data...')
    Barber.query.delete()
    Client.query.delete()
    Review.query.delete()

    # add some test barbers
    print('adding barbers...')
    barbers = [
        Barber(name='Excelsior', website='wwww.barbershop.com', street='123 Brooklyn ave', city=fake.city(), state=fake.state(), zip_code=fake.zip(), phone='8002239000', image='https://assets-global.website-files.com/644a9d9ce529ef8812f82a28/647fb85c69e95444243ef9bd_Henley%27s%20Gentlemen%27s%20Grooming%20-%20Barbershop%20and%20Mens%20Grooming.webp'),
        Barber(name='Fader', website='wwww.barbershop.com', street='1 Brook st', city=fake.city(), state=fake.state(), zip_code=fake.zip(), phone='8002239000', image='https://mikesbarbershops.com/wp-content/uploads/2019/11/IMG_8171.jpg'),
        Barber(name='Cuts', website='wwww.barbershop.com', street='29 Wonder st', city=fake.city(), state=fake.state(), zip_code=fake.zip(), phone='8002239000', image='https://media.gq-magazin.de/photos/5cf4d59293d170d22972ac8c/master/pass/Body&Care_BestBarber.jpg'),
        Barber(name='Ron The Barber', website='wwww.barbershop.com', street='93 79th st', city=fake.city(), state=fake.state(), zip_code=fake.zip(), phone='8002239000', image='https://d194ip2226q57d.cloudfront.net/images/hudsonhawk_5best_barbershop_mar20.2e16d0ba.fill-1200x650.jpg')
    ]

    db.session.add_all(barbers)
    db.session.commit()


    print('adding clients...')
    clients = [
        Client(name='Jimmy J'),
        Client(name='Jonny K'),
        Client(name='Tom C')
    ]
    
    db.session.add_all(clients)
    db.session.commit()

    print('adding reviews...')
    reviews = [
        Review(rating=5, message=fake.text(70), barber_id=barbers[0].id),
        Review(rating=4, message=fake.text(70), barber_id=barbers[0].id),
        Review(rating=2, message=fake.text(70), barber_id=barbers[0].id)
    ]
    
    db.session.add_all(reviews)
    db.session.commit() 

    print('adding users...')
    users = [
        User(username=fake.user_name(), _password=fake.password()),
        User(username=fake.user_name(), _password=fake.password()),
        User(username=fake.user_name(), _password=fake.password()),
    ]
    
    db.session.add_all(users)
    db.session.commit()

if __name__ == '__main__':
    with app.app_context():
        run()