import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faHeart } from "@fortawesome/free-solid-svg-icons";
import { ProductImage } from ".";
import "../style/Cart.css";

const CartItem = ({ item, handleUpdate, calcTotal }) => {
  const [quantity, setQuantity] = useState(item.quantity);
  return (
    <div className="row">
      <div className="description container mt-4">
        <div className="single-product-line row ">
          <div className="product-image col-sm-4">
            <ProductImage productImg={item.productImg}></ProductImage>
          </div>
          <div className="productOrder-description col-sm-8">
            <div className="productOrder-name">
              <h3>{item.name}</h3>
            </div>
            <div className="product-quantity">
              <p>Quantity: {quantity}</p>
            </div>
            <div className="icons">
              <p>${item.unitPrice}</p>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
