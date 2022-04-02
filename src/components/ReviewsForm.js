import React, { useState, useEffect } from "react";
import "../style/ReviewsForm.css";
import { useNavigate, useParams } from "react-router";
import useUser from "../hooks/useUser";
import { callApi } from "../axios-services";

const ReviewsForm = (props) => {
  const { user } = useUser();
  const ratings = [1, 2, 3, 4, 5];
  const initFormData = {
    rating: 1,
    title: "",
    comment: "",
  };
  const navigate = useNavigate();
  const { productId } = useParams();
  const [formData, setFormData] = useState(initFormData);

  const onChangeRating = (e) => {
    e.preventDefault();
    const value = e.target.value;
    setFormData({ ...formData, rating: parseInt(value || 1) });
  };

  const onChangeTitle = (e) => {
    e.preventDefault();
    const value = e.target.value;
    setFormData({ ...formData, title: value });
  };

  const onChangeComment = (e) => {
    e.preventDefault();
    const value = e.target.value;
    setFormData({ ...formData, comment: value });
  };

  const onSaveReview = async (e) => {
    e.preventDefault();
    const data = { ...formData };
    const url = `/reviews/${productId}`;
    const method = "post";
    const body = data;
    const token = user?.token;
    const response = await callApi({
      url,
      method,
      token,
      body,
    });
    if (response) {
      navigate(`/products/${productId}`);
    }
  };

  useEffect(() => {}, []);

  return (
    <div className="reviews__form__container d-flex flex-column my-3 align-items-center">
      <h2 className="review__form-title"> Review Form</h2>
      <form className="d-flex flex-column my-3 align-items-center">
        <div className="my-2 w-100">
          <input
            className="review__form-headline w-100"
            placeholder="title"
            onChange={onChangeTitle}
          ></input>
        </div>

        <div className="my-2 w-100">
          <input
            className="review__form-comment w-100"
            placeholder="comment"
            onChange={onChangeComment}
          ></input>
        </div>

        <div className="my-2 w-100">
          <lable className="review__form-rating">Rating: </lable>
          <select
            value={formData?.rating}
            onChange={onChangeRating}
            className="mx-2"
          >
            {ratings?.map((item) => (
              <option key={`id_${item}`}> {item} </option>
            ))}
          </select>
        </div>
        <div className="w-100 my-2">
          <button
            className="btn btn-secondary form-submit-btn w-100"
            type="submit"
            onClick={onSaveReview}
          >
            Save
          </button>
        </div>
        <div className="w-100 my-2">
          <button
            className="btn btn-secondary form-submit-btn w-100"
            type="cancel"
            onClick={(e) => {
              e.preventDefault();
              navigate(`/products/${productId}`);
            }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReviewsForm;
