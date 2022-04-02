import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faHeart } from "@fortawesome/free-solid-svg-icons";
import { ProductImage, ProductInfo } from ".";
import "../style/Cart.css";

const CartItem = () => {
  return (
    <div className="col1">
      <h1>Shoppping Cart</h1>
      <div className="">
        <div className="description">
          <div className="single-product-line">
            <div className="product-image">
              <ProductImage></ProductImage>
            </div>
            <div className="productOrder-description">
              <div className="productOrder-name">
                <h3>Product Name</h3>
              </div>
              <div className="product-quantity">
                <p>Quantity: 4</p>
              </div>
              <div className="icons">
                <FontAwesomeIcon icon={faHeart} />
                <FontAwesomeIcon icon={faTrashCan} />
              </div>
            </div>
            <div className="product-price">
              <p>$10</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
