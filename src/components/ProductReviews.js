import React from "react";
import "../style/ProductReviews.css";

const ProductReviews = ({ reviews }) => {
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
    <>
      <h3>Reviews</h3>
      <div className="reviews-wrapper">
        {reviews?.length
          ? reviews?.map((item) => (
              <div className="review" key={item?.id}>
                <div>
                  <strong>title: {item.title}</strong>
                </div>
                <div> rating: {item.rating}</div>
                <div> comment: {item.comment}</div>
                <div> author: {item.creatorId}</div>
              </div>
            ))
          : ""}
      </div>
      <div className="more-reviews-wrapper">
        <div> Show More Reviews</div>
      </div>
    </>
  );
};

export default ProductReviews;
