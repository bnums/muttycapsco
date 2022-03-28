import React, { createContext, useState } from "react";

const UserContext = createContext({});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [userOrder, setUserOrder] = useState({});

  return (
    <UserContext.Provider value={{ user, setUser, userOrder, setUserOrder }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
