import React, { useEffect } from "react";
import useUser from "../hooks/useUser";
import "../style/ProductReviews.css";
import { callApi } from "../axios-services";
import RatingStar from "./Ratingstar";

const ProductReviews = ({ reviews, setReviews }) => {
  const { user } = useUser();
  const onDelete = async (review) => {
    const { id } = review;
    const response = await callApi({
      url: `/reviews/${id}`,
      method: `delete`,
      token: user.token,
    });
    if (response?.id) {
      const newReviews = reviews.filter((item) => item.id !== id);
      setReviews(newReviews);
    }
  };

  useEffect(() => {}, [reviews, setReviews]);
  return (
    <>
      <h3>Reviews</h3>
      <div className="reviews-wrapper">
        {reviews?.length
          ? reviews?.map((item) => (
              <div className="card my-3 review" key={item?.id}>
                <div className="card-header d-flex align-items-center justify-content-between px-3">
                  <div>
                    <strong>{item.title}</strong>
                  </div>
                  <div>
                    {item.creatorId === user.id ? (
                      <div
                        className="btn btn-link"
                        onClick={(e) => {
                          e.preventDefault();
                          onDelete(item);
                        }}
                      >
                        Delete
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <div className="card-body">
                  <div>
                    <RatingStar rating={item.rating} />
                  </div>
                  <div> {item.comment}</div>
                  <div> Author: {item.creatorId}</div>
                </div>
              </div>
            ))
          : ""}
      </div>
      {/* <div className="more-reviews-wrapper">
        <div> Show More Reviews</div>
      </div> */}
    </>
  );
};

export default ProductReviews;
