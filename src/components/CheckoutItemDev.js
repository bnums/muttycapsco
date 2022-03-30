import React, { useState } from "react";

const CheckoutItemDev = ({ item, handleItemDelete, calcTotal }) => {
  const [quantity, setQuantity] = useState(item.quantity);

  return (
    <form>
      <div className="col">Product Name: {item.name}</div>
      <div className="col">Price: {item.unitPrice}</div>
      <select
        value={quantity}
        onChange={(e) => {
          setQuantity(e.target.value);
          calcTotal();
        }}
      >
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
        <option value={4}>4</option>
        <option value={5}>5</option>
      </select>
      <button
        onClick={() => {
          handleItemDelete(item.productId);
        }}
      >
        Delete
      </button>
    </form>
  );
};

export default CheckoutItemDev;
