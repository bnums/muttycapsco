import React from "react";
import useUser from "../hooks/useUser";
import "../style/ProductInfo.css";
const ProductInfo = ({ id, description, name, price, ...props }) => {
  const { shoppingCart } = useUser();

  const handleAddItem = async () => {
    let inCart = shoppingCart.filter((item) => item.productId === id);
    if (inCart.length === 0) {
      shoppingCart.push({ productId: id, name: name, unitPrice: price });
      console.log("Item Successfully added to cart!");
      localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
      return;
    }
    console.log("Unable to add item to cart");
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
