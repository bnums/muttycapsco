import React from "react";
import { useNavigate } from "react-router";
import "../style/HomeBanner.css";
const HomeBanner = () => {
  const navigate = useNavigate();
  return (
    <section className="homebanner">
      <div className="homebanner-content max-width">
        <div className="homebanner-title row">Welcome to MuttyCapsCo!</div>
        <div className="homebanner-subtitle row">
          We have never been more ready for the outdoors.
        </div>
        <button
          className="homebanner-button btn row "
          onClick={() => {
            navigate("/products");
          }}
        >
          Shop
        </button>
      </div>
    </section>
  );
};

export default HomeBanner;
