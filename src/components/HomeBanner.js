import React from "react";
import { useNavigate } from "react-router";
import "../style/HomeBanner.css";

const HomeBanner = () => {
  const navigate = useNavigate();
  return (
    <section className="homebanner">
      <div className="homebanner-content max-width">
        <div className="homebanner-nav-box">
          <a href="">
            <span>Caps</span>
          </a>
          <a href="">
            <span>Beanie</span>
          </a>
          <a href="">
            <span>About Us</span>
          </a>
          <a href="">
            <span>Contact Us</span>
          </a>
        </div>
        <div className="homebanner-text-box">
          <h1 className="homebanner-title">Welcome to</h1>
          <h1 className="homebanner-title">MuttyCapsCo!</h1>
          <h3 className="homebanner-subtitle">
            We have never been more ready for the outdoors.
          </h3>
          <button
            className="homebanner-button"
            onClick={() => {
              navigate("/products");
            }}
          >
            Shop
          </button>
        </div>
      </div>
    </section>
  );
};

export default HomeBanner;
