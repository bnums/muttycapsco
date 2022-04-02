import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const RatingStar = ({ rating = 1 }) => {
  const ratings = [1, 2, 3, 4, 5];
  return (
    <div className="rating-star">
      {ratings.map((item) => (
        <FontAwesomeIcon
          icon={faStar}
          className={item <= rating ? "rating-icon selected" : "rating-icon"}
        />
      ))}
    </div>
  );
};

export default RatingStar;
