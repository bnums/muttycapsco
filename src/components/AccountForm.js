import React, { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { callApi } from "../axios-services";
import { Form } from "react-bootstrap";
import { Container, Row, Col, Button } from "react-bootstrap";
import "../style/index.css";

const AccountForm = ({ setToken, setUser }) => {
  
  const params = useParams();
  let { method } = params;
  const loginRegister = method === "login" ? "Log in" : "Register";
  const accountTitle = method === "login" ? "Lets Explore Together" : "Join the Adventure";
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
    <div className="register-login-backdrop">
    <Container>
        {errors &&<div>{errors}</div>}
        <Row className="window1 m-auto">
        <Col lg={5} md={6} sm={12} className="window p-5 m-auto shadow-lg">
        <h3 className="text-title text-center">{accountTitle}</h3>
        <Form className = "login-register-form" onSubmit={handleSubmit}>
            <Form.Group className="form-Basic-Username"
            controlId="formBasicUsername">
            <Form.Control className= "username-box"
            required
            placeholder="Username"
            label="Username"
            type="Username"
            variant="outlined"
            value={username}
            onChange={(event) => {
              setUsername(event.target.value);
            }}/>
            </Form.Group>
            <Form.Group className="form-Basic-Password"
            controlId="formBasicPassword">
            <Form.Control className= "password-box"
            required
            placeholder="Password"
            label="Password"
            type="Password"
            variant="outlined"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}/>
            </Form.Group>
            <Form.Group className="form-Basic-Email"
            controlId="formBasicEmail">
            {method === "register" ? (<Form.Control className = "email-box"
            required
            placeholder="Email"
            label="Email"
            type="Email"
            variant="outlined"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }} 
          />) : null}
          </Form.Group>
          <Button style={{background: "#557272"}} className="login-register-button" type="submit" >{loginRegister}</Button>
          <div className="login-register-text">
            {method === "login" ? (
              <Link to={`/account/register`}>
                Don't have an account ? <button className="signup-text">Create One</button>
              </Link>
            ) : (
              <Link to={`/account/login`}>Already have an account ? <button className="login-text"> Log In</button> </Link>
            )}
          </div>
        </Form>
        </Col>
        </Row>
        </Container>
      </div>
    </>
  );
};

export default AccountForm;