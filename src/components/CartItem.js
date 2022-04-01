import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faHeart } from "@fortawesome/free-solid-svg-icons";
import { ProductImage } from ".";
import "../style/Cart.css";

const CartItem = ({ item, handleUpdate, index, itemCosts, calcTotal }) => {
  const [quantity, setQuantity] = useState(item.quantity);
  itemCosts[item.productId] = quantity * item.unitPrice;

  return (
    <form className="row">
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
              <label>Quantity:</label>
              <select
                value={quantity}
                onChange={(e) => {
                  setQuantity(e.target.value);
                  handleUpdate({
                    method: "patch",
                    productId: item.productId,
                    orderDetailId: item.orderDetailId,
                    fields: { quantity: e.target.value },
                    index,
                  });
                }}
              >
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
              </select>
            </div>
            <div className="icons">
              <p>${item.unitPrice}</p>
              {/* <FontAwesomeIcon icon={faHeart} /> */}
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
    </form>
  );
};

export default CartItem;
