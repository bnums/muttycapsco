import React from "react";
import { useParams } from "react-router";
import { callApi } from "../axios-services";
import "../style/ProductInfo.css";
const ProductInfo = ({ description, name, price, token, ...props }) => {
  const params = useParams();
  const { productId } = params;
  const handleAddItem = async () => {
    try {
      const createdOrder = await callApi({
        url: "/orders",
        method: "post",
        body: {
          orderTotal: 0,
          createdAt: new Date().toISOString().slice(0, 19).replace("T", " "),
        },
        token,
      });
      console.log("Order created", createdOrder);
      const addedItem = callApi({
        url: `/orders/${createdOrder.id}/products`,
        method: "POST",
        body: {
          productId: productId,
          quantity: 1,
          unitPrice: price,
          createdAt: new Date().toISOString().slice(0, 19).replace("T", " "),
        },
      });
      console.log("Item Successfully added", addedItem);
    } catch (error) {
      console.log("Unable to create order");
    }
  };
  return (
    <div className="product-info-container">
      <h3 className="product-name">{name}</h3>
      {/* <p className="product__card-options">3 Colors</p> */}
      <p className="product-price">${price}</p>
      <p className="product-description">{description}</p>
      <button onClick={handleAddItem} className="product-btn active-btn">
        Add to cart
      </button>
      <div className="product-btn secondary-btn"> Favorite </div>
    </div>
  );
};

export default ProductInfo;
