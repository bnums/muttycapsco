import React from "react";
import "../style/HomeBanner.css";
const HomeBanner = () => {
  return (
    <div className="homebanner container-fluid">
      <div className="homebanner-title">Welcome to MuttyCapsCo!</div>
      <div className="homebanner-content row ">
        <div className="homebanner-subtitle col-7">
          We have never been more ready for the outdoors.
        </div>
      </div>
      <button className="homebanner-button btn  row ">Shop</button>
    </div>
  );
};

export default HomeBanner;
