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
  updateUser,
  getUserById,
  deleteUser,
} = require("../db");
const { requireUser, requireAdmin } = require("./utils");

//POST registers a user
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

//POST logs a user in
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
        message: "Password is incorrect",
      });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});

//GET a users info
usersRouter.get("/me", requireUser, async (req, res, next) => {
  try {
    res.send(req.user);
  } catch (error) {
    next(error);
  }
});

//GET all registered users
usersRouter.get("/", async (req, res, next) => {
  try {
    const users = await getAllUsers();

    res.send(users);
  } catch (error) {
    next(error);
  }
});

// usersRouter.get("/:userId", async (req, res, next) => {
//   const { userId } = req.params;
//   try {
//     const user = await getUserById(userId);
//     res.send(user);
//   } catch ({ name, message }) {
//     next({ name, message });
//   }
// });

//GET gets a user's orders
usersRouter.get("/:userId/orders", async (req, res, next) => {
  const { userId } = req.params;
  try {
    const orders = await getOrdersByUserId(userId);
    res.send(orders);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

usersRouter.patch("/:userId", async (req, res, next) => {
  const { userId } = req.params;
  try {
    const toUpdateUser = { ...req.body, userId };
    const updatedUser = await updateUser(toUpdateUser);
    res.send(updatedUser);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

usersRouter.delete("/:userId", async (req, res, next) => {
  const { userId } = req.params;

  try {
    const deletedUser = await deleteUser(userId);
    res.send(deletedUser);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = usersRouter;