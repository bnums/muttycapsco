import React, { useEffect } from "react";
import useUser from "../hooks/useUser";
import { useQuery } from "react-query";
import { callApi } from "../axios-services";
import { useParams } from "react-router";
import { OrderCard } from "./";
const UserProfile = () => {
  const params = useParams();
  const { userId } = params;
  const { user, shoppingCart, setShoppingCart, setUserOrder } = useUser();

  const createOrder = async () => {
    const createdOrder = await callApi({
      url: "/orders",
      method: "post",
      body: {
        orderTotal: 0,
        createdAt: new Date().toISOString().slice(0, 19).replace("T", " "),
        userId: user.id,
      },
    });
    localStorage.setItem("userOrder", JSON.stringify(createdOrder));
    setUserOrder(createdOrder);
    console.log("Order created", createdOrder);
  };

  const fetchUserOrders = async () => {
    try {
      return await callApi({ url: `/users/${userId}/orders` });
    } catch (error) {
      console.error(error);
    }
  };

  const { data, status } = useQuery("getUserOrders", fetchUserOrders, {
    cacheTime: 10 * 60 * 1000,
  });
  const userOrders = data;

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h2>{`Welcome to ${user.username}'s page`}</h2>
      <h3>Your Current Order</h3>
      {userOrders && userOrders.length > 0 ? (
        userOrders
          .filter((order) => order.isActive === true)
          .map((order) => {
            return <OrderCard key={order.id} order={order} />;
          })
      ) : (
        <div>There are no current orders</div>
      )}
      <h3>Your Previous Orders</h3>
      {userOrders && userOrders.length > 0 ? (
        userOrders
          .filter((order) => order.isActive === false)
          .map((order) => {
            return <OrderCard key={order.id} order={order} />;
          })
      ) : (
        <div>You have not made any orders yet</div>
      )}
    </div>
  );
};

export default UserProfile;
