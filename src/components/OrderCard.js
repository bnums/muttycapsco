import React from "react";
import "../style/OrderCard.css";

const OrderCard = ({ order }) => {
  return (
    <div className="user-order container all-orders-container">
      {order.isActive ? (
        <div className="row single-order-container">
          <div className="user-order-id ">Order Id: {order.id}</div>
          <div className="user-order-items "> Items: {order.items.length}</div>
        </div>
      ) : (
        <div className="row single-order-container">
          <div className="user-order-id ">Order Id: {order.id}</div>
          <div className="user-order-createdAt ">
            Created At: {order.createdAt.slice(0, 10)}
          </div>
          <div className="user-order-items "> Items: {order.items.length}</div>
        </div>
      )}
    </div>
  );
};

export default OrderCard;
