import React from "react";
import useUser from "../hooks/useUser";
import { callApi } from "../axios-services";
import { useMutation, useQueryClient } from "react-query";
import CheckoutItemDev from "./CheckoutItemDev";

const CheckoutDev = () => {
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
    <div className="container-fluid">
      {user.username ? (
        <div className="row">
          <div className="col">
            {userOrder.items.length > 0 ? (
              userOrder.items.map((item, index) => {
                return (
                  <CheckoutItemDev
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
          <div className="col">Order Total col</div>
        </div>
      ) : (
        <div className="row">
          <div className="col">
            {shoppingCart.length > 0 ? (
              shoppingCart.map((item, index) => {
                return (
                  <CheckoutItemDev
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
          <div className="col">Order Total col</div>
        </div>
      )}
    </div>
  );
};

export default CheckoutDev;
