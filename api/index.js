const apiRouter = require("express").Router();
const usersRouter = require("./users");
const reviewsRouter = require("./reviews");
const ordersRouter = require("./orders");
const orderDetailsRouter = require("./orderDetails");
const productRouter = require("./products");
const stripeRouter = require("./stripe");
const { getUserById } = require("../db/users");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const { JWT_SECRET = "neverTell" } = process.env;

apiRouter.get("/", (req, res, next) => {
  res.send({
    healthy: true,
  });
});

apiRouter.use(async (req, res, next) => {
  const prefix = "Bearer ";
  const auth = req.header("Authorization");

  if (!auth) {
    next();
  } else if (auth.startsWith(prefix)) {
    const token = auth.slice(prefix.length);
    try {
      const { id } = jwt.verify(token, JWT_SECRET);
      if (id) {
        req.user = await getUserById(id);
        next();
      }
    } catch ({ name, message }) {
      next({ name, message });
    }
  } else {
    next({
      name: "AuthorizationHeaderError",
      message: `Authorization token must start with ${prefix}`,
    });
  }
});

// place your routers here
apiRouter.use("/users", usersRouter);
apiRouter.use("/products", productRouter);
apiRouter.use("/orders", ordersRouter);
apiRouter.use("/orderDetails", orderDetailsRouter);
apiRouter.use("/reviews", reviewsRouter);
apiRouter.use("/stripe", stripeRouter);

//custom error handlers
apiRouter.get("*", (req, res, next) => {
  res.status(404).send("This route does not exist");
});
module.exports = apiRouter;
