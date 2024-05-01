import React from 'react'
import { Outlet, useOutletContext} from "react-router-dom"
import NewReview from './NewReview'

const Reviews = ({ reviews, barber }) => {
    

  return (
    <div>
        <h2>Reviews</h2>
        <ul>
            {reviews.map(review => (
                <li key={review.id}>
                    <p>{review.created_at}</p>
                    <p>{review.message}</p>
                    <p>{review.rating}</p>  
                </li>
            ))}
        </ul>
        <NewReview barber={barber} />
    </div>
  )
}

export default Reviews