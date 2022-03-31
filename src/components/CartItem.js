import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faHeart } from "@fortawesome/free-solid-svg-icons";
import { ProductImage } from ".";
import "../style/Cart.css";

const CartItem = ({ item, handleUpdate, calcTotal }) => {
  return (
    <div className="container">
      <h1>Shoppping Cart</h1>
      <div className="col">
        <div className="description">
          <div className="single-product-line">
            <div className="product-image">
              <ProductImage></ProductImage>
            </div>
            <div className="productOrder-description container">
              <div className="productOrder-name">
                <h3>{item.name}</h3>
              </div>
              <div className="product-quantity">
                <p>Quantity: {item.quantity}</p>
              </div>
              <div className="icons">
                <FontAwesomeIcon icon={faHeart} />
                <FontAwesomeIcon
                  icon={faTrashCan}
                  onClick={(e) => {
                    e.preventDefault();
                    handleUpdate({
                      productId: item.productId,
                      method: "delete",
                      orderDetailId: item.orderDetailId,
                    });
                  }}
                />
                <div className="product-price">
                  <p>{item.unitPrice}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
