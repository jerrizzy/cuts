import React, { useState, useEffect } from "react";

function NewReview({ barber }) {
    const [message, setMessage] = useState("");
    const [rating, setRating] = useState(1);
    const [client, setClient] = useState(3);
    const [created_at, setCreated_at] = useState(new Date());
    const [barber_id, setBarber_id] = useState(barber.id);
    const [review, setReview] = useState([]);

    useEffect(() => {
        setReview(barber.reviews);
    }, [barber]);

    function handleSubmit(e) {
        e.preventDefault();

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
            setReview([...review, data]);
        })
        .catch((error) => {
            console.error("Error posting review:", error);
        });
    }

  return (
    <div>
        <h3>Write Review</h3>
        <form className="new-message" onSubmit={handleSubmit}>
        <input
            type="text"
            name="message"
            autoComplete="off"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">Submit</button>
        </form>
    </div>
  )
}

export default NewReview;