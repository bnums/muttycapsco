import React from "react";
import "../style/ProductReviews.css";

const ProductReviews = (props) => {
  const mockData = [
    {
      title: "Amazing",
      rating: 5,
      review:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      author: "remote control",
      color: "mustard yellow",
    },
  ];
  return (
    <div className="product-reviews-container">
      <h3>Reviews</h3>
      <div className="reviews-wrapper">
        {mockData?.map((item) => (
          <div className="review">
            <div>
              <strong>{item.title}</strong>
            </div>
            <div>{item.rating}</div>
            <div>{item.review}</div>
            <div>{item.author}</div>
            <div>{item.color}</div>
          </div>
        ))}
      </div>
      <div className="more-reviews-wrapper">
        <div> Show More Reviews</div>
      </div>
    </div>
  );
};

export default ProductReviews;
