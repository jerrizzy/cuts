import {React, useState } from 'react';
import { Link } from "react-router-dom"
import BarberPage from './BarberPage';

function BarberCard({ barber, key }) {
  // const [rating, setRating] = useState(averageRating);

const reviewMessage = barber.reviews.length > 0 ? barber.reviews[0].message : '';
const reviewRating = barber.reviews.length > 0 ? barber.reviews[0].rating : '';

// const averageRating = barber.reviews.reduce((acc, review) => {
//     return acc + review.rating;
// }, 0) / Math.ceil(barber.reviews.length);

const averageRating = Math.ceil(barber.reviews.reduce((acc, review) => {
    return acc + review.rating;
}, 0) / barber.reviews.length); // get average rating

// TODO: averagerating is not updating unless the page is refreshed, and needs to be passed to the BarberPage component and rendered there as well
// bug: after adding a review, the average rating is not updating on the barber card
console.log(averageRating);


return (
    <Link to={`/barbers/${barber.id}`}>
        <div onMouseEnter={()=> setPosition(barber.position)} className='barber-card-container'>

            <div>
            <img className="barberimage" src={barber.image} alt={"barber-image"} />
            </div>
            
            <div className='barber-card-detail'>
            <h3>name: {barber.name}</h3>
            <h4>{barber.city}</h4>
            <p>{barber.website}</p>
            
            
            <div className='barber-card-rating'>
            <p>review: {reviewMessage}</p>
            {/* <p>{barber.bio}</p> */}
            {/* <p>overall: {averageRating}</p> */}

            

    <div className="rating">
  <input type="radio" id="star5" name="rate" value="5" />
  <label title="Excellent!" for="star5" style={{ fill: averageRating >= 5 ? "#ffa723" : "#666" }}>
    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512">
      <path
        d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
      ></path>
    </svg>
  </label>
  <input value="4" name="rate" id="star4" type="radio" />
  <label title="Great!" for="star4" style={{ fill: averageRating >= 4 ? "#ffa723" : "#666" }}>
    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512">
      <path
        d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
      ></path>
    </svg>
  </label>
  <input value="3" name="rate" id="star3" type="radio" />
  <label title="Good" for="star3" style={{ fill: averageRating >= 3 ? "#ffa723" : "#666" }}>
    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512">
      <path
        d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
      ></path>
    </svg>
  </label>
  <input value="2" name="rate" id="star2" type="radio" />
  <label title="Okay" for="star2" style={{ fill: averageRating >= 2 ? "#ffa723" : "#666" }}>
    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512">
      <path
        d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
      ></path>
    </svg>
  </label>
  <input value="1" name="rate" id="star1" type="radio" />
  <label title="Bad" for="star1" style={{ fill: averageRating >= 1 ? "#ffa723" : "#666" }}>
    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512">
      <path
        d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
      ></path>
    </svg>
  </label>
  </div>
</div>
</div>
</div>
        
    </Link>
    
)
}

export default BarberCard;