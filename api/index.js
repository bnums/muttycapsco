const apiRouter = require("express").Router();
const userRouter = require("./users");
const reviewsRouter = require("./reviews");
const { getUserById } = require("../db/users");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

//const productRouter = require("./products");
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
apiRouter.use("/users", userRouter);
apiRouter.use("/reviews", reviewsRouter);
//apiRouter.use("/products", productRouter);

module.exports = apiRouter;
