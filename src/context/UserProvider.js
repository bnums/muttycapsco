import React, { createContext, useState } from "react";

const UserContext = createContext({});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [userOrders, setUserOrders] = useState([]);
  const [shoppingCart, setShoppingCart] = useState({});

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        userOrders,
        setUserOrders,
        shoppingCart,
        setShoppingCart,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
