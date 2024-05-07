import { React, useState } from 'react'
import { Outlet, useOutletContext} from "react-router-dom"
import { FaStar } from "react-icons/fa"
import NewReview from './NewReview'

const Reviews = ({ reviews, barber }) => {
  const [review, setReview] = useState([]); // state for new reviews

  return (
    <div>
        <h2>Reviews</h2>
        <NewReview barber={barber} review={review} setReview={setReview} />

        {/* // new reviews being rendered here */}
        <ul>
            {review.map((review, index) => (
                <li key={index}>
                    <p>{review.created_at}</p>
                    <p>{review.message}</p>
                    <p>{review.rating}</p>  
                </li>
            ))}

            {/* old reviews are being rendered here */}
            {reviews.map(review => (
                <li key={review.id}>
                    <p>{review.created_at}</p>
                    <p>{review.message}</p>
                    <p>{review.rating}</p>  
                </li>
            ))}
        </ul>
        
    </div>
  )
}

export default Reviews