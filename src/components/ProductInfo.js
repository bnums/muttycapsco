import React, { useEffect, useState } from "react";
import useUser from "../hooks/useUser";
import "../style/ProductInfo.css";
const ProductInfo = ({ id, description, name, price, setShow, ...props }) => {
  const { shoppingCart } = useUser();
  const [errMsg, setErrMsg] = useState("");
  const [disable, setDisable] = useState(false);
  let inCart = shoppingCart.filter((item) => item.productId === id);

  const handleAddItem = async () => {
    shoppingCart.push({
      productId: id,
      name: name,
      unitPrice: price,
      quantity: 1,
    });
    setShow(true);
    setDisable(true);
    localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
    return;
  };

  useEffect(() => {
    if (inCart.length !== 0) {
      setDisable(true);
    }
  }, [inCart]);

  return (
    <div className="product-info-container">
      <h3 className="product-name">{name}</h3>
      {/* <p className="product__card-options">3 Colors</p> */}
      <p className="product-price">${price}</p>
      <p className="product-description">{description}</p>
      <button
        onClick={handleAddItem}
        disabled={disable}
        className="product-btn active-btn"
      >
        {disable ? `Item already in cart` : "Add Item "}
      </button>
      <div className="product-btn secondary-btn">Favorite</div>
    </div>
  );
};

export default ProductInfo;
