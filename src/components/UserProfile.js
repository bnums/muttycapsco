import React, { useState } from "react";
import useUser from "../hooks/useUser";
import { useQuery } from "react-query";
import { callApi } from "../axios-services";
import { useParams } from "react-router";
import { OrderCard } from "./";
const UserProfile = () => {
  const params = useParams();
  const { userId } = params;
  const { user, setUserOrder } = useUser();
  const [currentOrder, setCurrentOrder] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);

  const createOrder = async () => {
    try {
      await callApi({
        url: "/orders",
        method: "post",
        body: {
          orderTotal: 0,
          createdAt: new Date().toISOString().slice(0, 19).replace("T", " "),
          userId: user.id,
        },
      });
    } catch (error) {
      console.error("ErrorCreatingOrder");
    }
  };

  const fetchUserOrders = async () => {
    try {
      const userOrders = await callApi({
        url: `/users/${userId}/orders`,
      });
      if (userOrders) {
        const activeOrder = userOrders.filter((order) => order.isActive);
        if (activeOrder.length === 0) {
          createOrder();
        }
        localStorage.setItem("userOrder", JSON.stringify(activeOrder[0]));
        if (activeOrder[0]) {
          setUserOrder(activeOrder[0]);
        }
        setCurrentOrder(activeOrder);
        setCompletedOrders(userOrders.filter((order) => !order.isActive));
      } else {
        createOrder();
      }
    } catch (error) {
      console.error(error);
    }
  };

  useQuery("getUserOrders", fetchUserOrders);

  return (
    <div className="container pt-5 pb-5">
      <h2>{`Welcome to ${user.username}'s page`}</h2>
      <h3>Your Current Order</h3>
      {currentOrder && currentOrder.length > 0
        ? currentOrder.map((order) => {
            return <OrderCard key={order.id} order={order} />;
          })
        : null}
      <h3>Your Previous Orders</h3>
      {completedOrders && completedOrders.length > 0 ? (
        completedOrders.map((order) => {
          return <OrderCard key={order.id} order={order} />;
        })
      ) : (
        <div>You have not made any orders yet</div>
      )}
    </div>
  );
};

export default UserProfile;
