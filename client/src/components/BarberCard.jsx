import React from 'react';
import { Link } from "react-router-dom"

function BarberCard({ barber }) {

const reviewMessage = barber.reviews.length > 0 ? barber.reviews[0].message : '';
const reviewRating = barber.reviews.length > 0 ? barber.reviews[2].rating : '';

return (
    <Link to={`/barbers/${barber.id}`}>
        <div className='barber-card-container'>
            <div>
            <img src={barber.image} alt={"barber-image"} />
            </div>
            <div>
            <h3>name: {barber.name}</h3>
            </div>
            <div>
            <p>review: {reviewMessage}</p>
            {/* <p>{barber.bio}</p> */}
            <p>rating: {reviewRating}</p>
            </div>
        </div>
    </Link>
    
)
}

export default BarberCard;