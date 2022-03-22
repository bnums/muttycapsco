import React, { useState } from "react";
import { Rating } from "react-simple-star-rating";
import "../style/ReviewsForm.css";

const ReviewsForm = () => {
  const [rating, setRating] = useState(3);
  return (
    <div className="reviews__form__container">
      <h2 className="review__form-title"> Form Title Here</h2>
      <form>
        <input className="review__form-headline"></input>
        <input className="review__form-comment"></input>
      </form>
    </div>
  );
};

export default ReviewsForm;
