import React from "react";
import cd_1 from "../imgs/yello-beanie.png";

const TemplateProductCard = () => {
  return (
    <div className="template-product-card">
      <img src={cd_1}></img>
      <h3 className="template-card-title">Product Name</h3>
      <p className="template-card-price">Price</p>
    </div>
  );
};

export default TemplateProductCard;
