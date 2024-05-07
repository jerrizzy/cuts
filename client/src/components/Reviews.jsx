import  React, { useState } from 'react';
import { Outlet, useOutletContext} from "react-router-dom"
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import NewReview from './NewReview'

const Reviews = ({ reviews, barber }) => {
    
  const [review, setReview] = useState([]); // state for new reviews

  // Combine old and new reviews
  const allReviews = [...reviews, ...review];

  // Sort reviews by creation date in descending order
  allReviews.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
  

  return (
    <div>
        <h2>Reviews</h2>
        <NewReview barber={barber} review={review} setReview={setReview} />

        <ul>
            {/* Render all reviews */}
                {allReviews.map((review, index) => (
                    <li key={index}>
                        <p>{review.created_at}</p>
                        <Box
                            sx={{
                                '& > legend': { mt: 2 },
                            }}
                        >
                            <Typography component="legend">Rating</Typography>
                            <Rating name="read-only" value={review.rating} readOnly />
                        </Box>
                        <p>{review.message}</p>
                         
                </li>
            ))}
        </ul>

    </div>
  )
}

export default Reviews