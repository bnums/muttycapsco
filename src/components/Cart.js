import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleQuestion } from "@fortawesome/free-solid-svg-icons";
import "../style/Cart.css";
import CartItem from "./CartItem";
import useUser from "../hooks/useUser";
import { callApi } from "../axios-services";
import { useMutation, useQueryClient } from "react-query";

const Cart = () => {
  const {
    user,
    user: { token },
    userOrder,
    setUserOrder,
    shoppingCart,
    setShoppingCart,
  } = useUser();
  const queryClient = useQueryClient();
  const { mutate } = useMutation(callApi, {
    onSuccess: (data) => {
      queryClient.invalidateQueries("getUserOrders");
      userOrder.items = userOrder.items.filter(
        (item) => item.productId !== data.productId
      );
      setUserOrder(userOrder);
      localStorage.setItem("userOrder", JSON.stringify(userOrder));
    },
  });

  const handleUpdate = async ({ productId, method, orderDetailId, fields }) => {
    if (user.username) {
      try {
        mutate({
          url:
            method === "post" ? "updating" : `/orderDetails/${orderDetailId}`,
          method: method,
          body: fields,
          token,
        });
      } catch (error) {
        console.error(error);
      }
    } else {
      if (method === "delete") {
        const updatedCart = shoppingCart.filter(
          (item) => item.productId !== productId
        );
        setShoppingCart(updatedCart);
        localStorage.setItem("shoppingCart", JSON.stringify(updatedCart));
      }
    }
  };

  return (
    <div className="content container">
      <div className="row">
        {user.username ? (
          <div className="col-6">
            {userOrder.items.length > 0 ? (
              userOrder.items.map((item, index) => {
                return (
                  <CartItem
                    key={index}
                    item={item}
                    handleUpdate={handleUpdate}
                  />
                );
              })
            ) : (
              <div>Cart is empty</div>
            )}
          </div>
        ) : (
          <div className="col-6">
            {shoppingCart.length > 0 ? (
              shoppingCart.map((item, index) => {
                return (
                  <CartItem
                    key={index}
                    item={item}
                    handleUpdate={handleUpdate}
                  />
                );
              })
            ) : (
              <div>Cart is empty</div>
            )}
          </div>
        )}

        {/* ===== RIGHT SIDE: SUMMARY DETAILS ===== */}
        <div className="col-6">
          <div className="summary">
            <h1>Summary</h1>
            <div className="pricing-breakdown">
              <div className="subtotal">
                <p>Subtotal: </p>
                <span className="">$20.99</span>
              </div>
              <div className="estimated-shipping">
                <p>
                  Estimated Shipping
                  <FontAwesomeIcon icon={faCircleQuestion} />
                </p>
                <span className="">$1.50</span>
              </div>
              <div className="estimated-tax">
                <p>Estimated Tax: </p>
                <span className="">$1.45</span>
              </div>
            </div>
            <div className="orderTotal">
              <p>Total: </p>
              <span>$65.99</span>
            </div>
            <button className="">
              <Link to="">Checkout</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
