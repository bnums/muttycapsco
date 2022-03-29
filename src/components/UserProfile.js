import React from "react";
import useUser from "../hooks/useUser";
import { useQuery } from "react-query";
import { callApi } from "../axios-services";
import { useParams } from "react-router";
const UserProfile = () => {
  const params = useParams();
  const { userId } = params;
  const { user, setShoppingCart } = useUser();

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
  let userOrders = data;

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {`This is ${user.username}'s page`}
      {userOrders && userOrders.length > 0 ? (
        userOrders.map((order) => {
          return (
            <div key={order.id}>
              <div>Order Id: {order.id}</div>
              <div>Created At: {order.createdAt}</div>
              <div>Status: {order.isActive ? "true" : "false"}</div>
              <div> Items: {order.items.length}</div>
            </div>
          );
        })
      ) : (
        <div>There are no user orders</div>
      )}
    </div>
  );
};

export default UserProfile;
