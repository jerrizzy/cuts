import React from 'react'
import { Outlet, useOutletContext} from "react-router-dom"
import { FaStar } from "react-icons/fa"
import NewReview from './NewReview'

const Reviews = ({ reviews, barber }) => {
    

  return (
    <div>
        <h2>Reviews</h2>
        <NewReview barber={barber} />
        <ul>
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