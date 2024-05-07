import React, { useState, useEffect } from "react";
import './NewReview.css'
// import useNavigate from 'react-router-dom'

function NewReview({ barber, review, setReview }) {
    const [message, setMessage] = useState("");
    const [rating, setRating] = useState(1);
    const [client, setClient] = useState(3);
    const [created_at, setCreated_at] = useState(new Date());
    const [barber_id, setBarber_id] = useState(barber.id);
    const [showForm, setShowForm] = useState(false);
    // const navigate = useNavigate();

    

    function handleShowForm() {
        setShowForm((showForm) =>!showForm);
    }

    function handleSubmit(e) {
        e.preventDefault();
        setShowForm((showForm) =>!showForm)

        let newReview = {barber_id, rating, message, client, created_at};

        fetch("http://localhost:5555/reviews", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newReview),
        })
        .then((res) => {
            if (!res.ok) {
                throw new Error('Failed to post review');
            }
            return res.json();
        })
        .then((data) => {
            // Clear input fields
            setMessage("");
            setRating(1);

            // Update review state
            setReview([data, ...review]); // Prepend the new review to the existing list
  
        })
        .catch((error) => {
            console.error("Error posting review:", error);
        });
    }

  return (
    <div>
        <button className="add-review-button" onClick={handleShowForm}>Write Review</button>
        {showForm ?
        <div className="form">
            
        <form className="new-message-form" onSubmit={handleSubmit}>

        <div className="rating">
  <input type="radio" id="star5" name="rate" value={5}  checked={rating === 5} onChange={() => setRating(5)}/>
<label title="Excellent!" for="star5" style={{ fill: rating >= 5 ? "#ffa723" : "#666" }}>
    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512">
      <path
        d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
      ></path>
    </svg>
  </label>
  <input value={4} name="rate" id="star4" type="radio" checked={rating === 4} onChange={() => setRating(4)} />
  <label title="Great!" for="star4" style={{ fill: rating >= 4 ? "#ffa723" : "#666" }}>
    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512">
      <path
        d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
      ></path>
    </svg>
  </label>
  <input value={3} name="rate" id="star3" type="radio" checked={rating === 3} onChange={() => setRating(3)} />
  <label title="Good" for="star3" style={{ fill: rating >= 3 ? "#ffa723" : "#666" }}>
    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512">
      <path
        d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
      ></path>
    </svg>
  </label>
  <input value={2} name="rate" id="star2" type="radio" checked={rating === 2} onChange={() => setRating(2)} />
  <label title="Okay" for="star2" style={{ fill: rating >= 2 ? "#ffa723" : "#666" }}>
    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512">
      <path
        d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
      ></path>
    </svg>
  </label>
  <input value={1} name="rate" id="star1" type="radio" checked={rating === 1} onChange={() => setRating(1)}/>
  <label title="Bad" for="star1" style={{ fill: rating >= 1 ? "#ffa723" : "#666" }}>
    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512">
      <path
        d="M316.9 18C311.6 7 300.4 0 288.1 0s-23.4 7-28.8 18L195 150.3 51.4 171.5c-12 1.8-22 10.2-25.7 21.7s-.7 24.2 7.9 32.7L137.8 329 113.2 474.7c-2 12 3 24.2 12.9 31.3s23 8 33.8 2.3l128.3-68.5 128.3 68.5c10.8 5.7 23.9 4.9 33.8-2.3s14.9-19.3 12.9-31.3L438.5 329 542.7 225.9c8.6-8.5 11.7-21.2 7.9-32.7s-13.7-19.9-25.7-21.7L381.2 150.3 316.9 18z"
      ></path>
    </svg>
  </label>
  </div>
            
        <input
            className="input-text"
            type="text"
            name="message"
            autoComplete="off"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
        />
        <button className="submit" type="submit">Submit</button>
        </form>
        </div> : null}
    </div>
  )
}

export default NewReview;