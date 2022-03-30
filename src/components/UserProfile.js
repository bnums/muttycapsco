import React, { useEffect, useState } from "react";
import useUser from "../hooks/useUser";
import { useQuery } from "react-query";
import { callApi } from "../axios-services";
import { useParams } from "react-router";
import { OrderCard } from "./";
const UserProfile = () => {
  const params = useParams();
  const { userId } = params;

  const { user } = useUser();

  // useEffect(() => {
  //   fetchUserOrders(userId);
  // }, []);

  return (
    <div className="container">
      <h2>{`Welcome to ${user.username}'s page`}</h2>
      <h3>Your Previous Orders</h3>
      {/* {completedOrders && completedOrders.length > 0 ? (
        completedOrders.map((order) => {
          return <OrderCard key={order.id} order={order} />;
        })
      ) : (
        <div>You have not made any orders yet</div>
      )} */}
    </div>
  );
};

export default UserProfile;
