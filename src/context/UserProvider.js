import React, { createContext, useState } from "react";

const UserContext = createContext({});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [userOrder, setUserOrder] = useState([]);
  const [shoppingCart, setShoppingCart] = useState([]);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        userOrder,
        setUserOrder,
        shoppingCart,
        setShoppingCart,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
