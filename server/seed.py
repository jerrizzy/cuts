import random
from app import app
from models import db, Barber, Client, Review
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
        Barber(name='Excelsior', address='123 Brooklyn ave, 11237', phone='8002239000', image='https://www.google.com/imgres?q=barbershops&imgurl=https%3A%2F%2Fheygoldie.com%2Fblog%2Fwp-content%2Fuploads%2F2021%2F12%2Fbarber-shop-decor-ideas.jpg&imgrefurl=https%3A%2F%2Fheygoldie.com%2Fblog%2Fbarber-shop-decor-ideas&docid=0It93RWET_f2JM&tbnid=jpc8H_XEHbBb_M&vet=12ahUKEwj347-7792FAxX5pokEHcjWAxAQM3oECDIQAA..i&w=1000&h=664&hcb=2&ved=2ahUKEwj347-7792FAxX5pokEHcjWAxAQM3oECDIQAA'),
        Barber(name='Fader', address='1445 flatbush ave, 11235', phone='8002235050', image='https://www.google.com/imgres?q=barbershops&imgurl=https%3A%2F%2Fwww.coronabarbershopplus.com%2Fwp-content%2Fuploads%2F2023%2F05%2FCBS-Carousel-2023-002.jpg&imgrefurl=https%3A%2F%2Fwww.coronabarbershopplus.com%2F&docid=KMlrAPuWZnvfJM&tbnid=VX6x4fov3TzCjM&vet=12ahUKEwj347-7792FAxX5pokEHcjWAxAQM3oECDAQAA..i&w=1600&h=1066&hcb=2&ved=2ahUKEwj347-7792FAxX5pokEHcjWAxAQM3oECDAQAA'),
        Barber(name='Xtension', address='234 Gateway st, 11545', phone='8002449000', image='https://www.google.com/imgres?q=barbershops&imgurl=https%3A%2F%2Fflatironnomad.nyc%2Fwp-content%2Fuploads%2F2022%2F05%2FChaps_1.jpeg&imgrefurl=https%3A%2F%2Fflatironnomad.nyc%2F2021%2F12%2F08%2Fnew-neighbor-chaps-co-barbershop%2F&docid=e1_tNuSFhWH2jM&tbnid=tFFEw3uCyf9D7M&vet=12ahUKEwj347-7792FAxX5pokEHcjWAxAQM3oECBYQAA..i&w=2226&h=2252&hcb=2&ved=2ahUKEwj347-7792FAxX5pokEHcjWAxAQM3oECBYQAA'),
        Barber(name='Cuts', address='90 80th st, 11377', phone='8882239000', image='https://www.google.com/imgres?q=barbershops&imgurl=https%3A%2F%2Fwhyy.org%2Fwp-content%2Fuploads%2F2018%2F02%2F2018-02-02-e-lee-mike-jordan-mark-belle-philadelphia-south-street-barbers-2-768x512.jpg&imgrefurl=https%3A%2F%2Fwhyy.org%2Fsegments%2Fblack-barbershop-care-beyond-hair%2F&docid=ixP62CpotJDuMM&tbnid=wqY3y5cFOENbKM&vet=12ahUKEwj347-7792FAxX5pokEHcjWAxAQM3oECBoQAA..i&w=768&h=512&hcb=2&ved=2ahUKEwj347-7792FAxX5pokEHcjWAxAQM3oECBoQAA'),
        Barber(name='Ron The Barber', address='1 Remsen ave, 11236', phone='8992239030', image='https://www.google.com/imgres?q=barbershops&imgurl=https%3A%2F%2Fi0.wp.com%2Fwww.yesmagazine.org%2Fwp-content%2Fuploads%2Fimports%2F5b52ae1975894bf58eef5af52ee8e867.jpg%3Ffit%3D1400%252C840%26quality%3D90%26ssl%3D1&imgrefurl=https%3A%2F%2Fwww.yesmagazine.org%2Fissue%2Fmental-health%2F2018%2F08%2F24%2Fwhat-is-barbershop-therapy&docid=V1Qj0X2kQY1JrM&tbnid=LwYH65EB_tVGOM&vet=12ahUKEwj347-7792FAxX5pokEHcjWAxAQM3oECEoQAA..i&w=1400&h=840&hcb=2&ved=2ahUKEwj347-7792FAxX5pokEHcjWAxAQM3oECEoQAA')
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

if __name__ == '__main__':
    with app.app_context():
        run()