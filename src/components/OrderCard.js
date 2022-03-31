import React from "react";

const OrderCard = ({ order }) => {
  return (
    <div className="user-order container">
      {order.isActive ? (
        <div className="row">
          <div className="user-order-id ">Order Id: {order.id}</div>
          <div className="user-order-items "> Items: {order.items.length}</div>
        </div>
      ) : (
        <div className="row">
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
