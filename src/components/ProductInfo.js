import React, { useEffect, useState } from "react";
import useUser from "../hooks/useUser";
import { useMutation, useQueryClient } from "react-query";
import "../style/ProductInfo.css";
import { callApi } from "../axios-services";

const ProductInfo = ({ id, description, name, price, setShow, productImg }) => {
  const { user, shoppingCart, userOrder } = useUser();
  const [disable, setDisable] = useState(false);
  const queryClient = useQueryClient();
  let inCart = shoppingCart.filter((item) => item.productId === id);

  const { mutate } = useMutation(callApi, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("getUserOrders");
      const { id, productId, quantity, unitPrice, orderId, productImg } = data;
      if (
        userOrder.items.push({
          name,
          orderDetailId: id,
          productId,
          quantity,
          unitPrice,
          orderId,
          productImg,
        })
      ) {
        localStorage.setItem("userOrder", JSON.stringify(userOrder));
      }
    },
  });

  const handleAddItem = async () => {
    if (user.username) {
      try {
        mutate({
          url: `/orders/${userOrder.id}/products`,
          method: "post",
          body: {
            productId: id,
            quantity: 1,
            unitPrice: price,
            createdAt: new Date().toISOString().slice(0, 19).replace("T", " "),
          },
        });
      } catch (error) {
        console.error(error);
      }
    } else {
      if (
        shoppingCart.push({
          productId: id,
          name: name,
          unitPrice: price,
          quantity: 1,
          productImg: productImg,
        })
      ) {
        localStorage.setItem("shoppingCart", JSON.stringify(shoppingCart));
      }
    }
    setShow(true);
    setDisable(true);
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
