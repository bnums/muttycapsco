const express = require("express");
const usersRouter = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { JWT_SECRET = "neverTell" } = process.env;

const {
  createUser,
  getUserByUsername,
  getUser,
  getAllUsers,
  getOrdersByUserId,
} = require("../db");
const { requireUser } = require("./utils");

usersRouter.post("/register", async (req, res, next) => {
  const { username, password, email, isAdmin } = req.body;
  try {
    if (password.length < 8) {
      next({
        name: "passwordLengthError",
        message: "Password is too short",
      });
      return;
    }
    const duplicatedUser = await getUserByUsername(username);
    if (duplicatedUser) {
      next({
        name: "duplicatedUserError",
        message: "Username is already taken",
      });
      return;
    }
    const user = await createUser({ username, password, email, isAdmin });
    const token = jwt.sign(user, JWT_SECRET);

    res.send({
      user,
      message: "Thank you for signing up",
      token,
    });
  } catch (error) {
    next(error);
  }
});

usersRouter.post("/login", async (req, res, next) => {
  const { username, password } = req.body;
  if (!username || !password) {
    next({
      name: "MissingCredentialsError",
      message: "Please supply both a username and password",
    });
  }
  try {
    const user = await getUser(req.body);
    if (user) {
      const token = jwt.sign(user, JWT_SECRET);
      res.send({ user, token, message: "you're logged in!" });
    } else {
      next({
        name: "IncorrectCredentialsError",
        message: "Username or password is incorrect",
      });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

usersRouter.get("/me", requireUser, async (req, res, next) => {
  try {
    res.send(req.user);
  } catch (error) {
    next(error);
  }
});

usersRouter.get("/", async (req, res, next) => {
  try {
    const users = await getAllUsers();

    res.send(users);
  } catch (error) {
    next(error);
  }
});

usersRouter.get("/:userId/orders", async (req, res, next) => {
  const { userId } = req.params;
  try {
    const orders = await getOrdersByUserId(userId);
    console.log("this is the order", orders);
    res.send(orders);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = usersRouter;
