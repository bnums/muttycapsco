import React, { useState } from "react";

const CheckoutItemDev = ({ item, handleUpdate, calcTotal }) => {
  const [quantity, setQuantity] = useState(item.quantity);

  return (
    <form className="row">
      <div className="col">
        <h5>{item.name}</h5>
        <p>Quantity: {item.quantity}</p>
        <p>Price: {item.unitPrice}</p>
        <button
          onClick={(e) => {
            e.preventDefault();
            handleUpdate({
              productId: item.productId,
              method: "delete",
              orderDetailId: item.orderDetailId,
            });
          }}
        >
          Delete
        </button>
      </div>
    </form>
  );
};

export default CheckoutItemDev;
