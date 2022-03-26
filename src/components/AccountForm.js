import React, { useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { callApi } from "../axios-services";

const AccountForm = ({ setToken, setUser }) => {
  
  const params = useParams();
  let { method } = params;
  const accountTitle = method === "login" ? "Log in" : "Register";
//   const emailTitle = method === 
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (event) => {
    try{
    event.preventDefault();
    const user = await callApi({
      url: `/users/${method}`,
      method: "POST",
      body: { username, password, email },
    });
    const token = user && user.token;
    console.log("this is the token", token);
    setErrors(user.message)
    console.log(user.message)
    if (token) {
      const username = await callApi({
        url: `/users/me`,
        method: "GET",
        token,
      });
      const users = username;
      console.log("This is users", users);
      if (users) {
        setUsername("");
        setPassword("");
        setToken(token);
        setUser(users);
        navigate("/");
        localStorage.setItem("token", token);
      }
    }
  }catch(error){
    console.log("this is an error",error)
  }
  };

  return (
    <>
      <div>
        {errors &&<div>{errors}</div>}
        <h1 className = "Login-Register-title">{accountTitle}</h1>
        <form onSubmit={handleSubmit}>
          <input className = "Username-box"
            required
            placeholder="Username"
            label="Username"
            value={username}
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <input className = "Password-box"
            required
            placeholder="Password"
            label="Password"
            type="Password"
            variant="outlined"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
             <input className = "Email-box"
            required
            placeholder="Email"
            label="Email"
            type="Email"
            variant="outlined"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          <button className="login-register-button" type="submit">{accountTitle}</button>
          <div className="login-register-text">
            {method === "login" ? (
              <Link to={`/account/register`}>
                Don't have an account? Sign Up
              </Link>
            ) : (
              <Link to={`/account/login`}>Already have an account? Log In</Link>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default AccountForm;