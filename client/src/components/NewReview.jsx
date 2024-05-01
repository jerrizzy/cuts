import React, { useState } from "react";

function NewReview({ barber }) {
    const [message, setMessage] = useState("");

    function handleSubmit(e) {
        e.preventDefault();

        fetch("http://localhost:5555/reviews", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                barber_id: barber.id,
                rating: 1,
                message: message,
            }),
        })
        .then((res) => res.json())
        .then((data) => setMessage([...message, data]))
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