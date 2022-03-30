import React from "react";
import "../style/ProductReviews.css";

const ProductReviews = ({ reviews }) => {
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
