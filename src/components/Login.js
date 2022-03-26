import React from "react";
import { useState } from "react";
import { login } from "../axios-services";

const Login = ({ token }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");


  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const token = await login(username, password);
      console.log("token", token);
    } catch (error) {
      console(error);
    }
  };

  return (
    <div>
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input
          type="username"
          value={username}
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <input
          type="password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <button>submit</button>
      </form>
    </div>
  );
};

export default Login;