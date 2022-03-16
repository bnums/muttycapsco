const apiRouter = require("express").Router();
const { getUserById } = require("../db/users");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

//const productRouter = require("./products");
apiRouter.get("/", (req, res, next) => {
  res.send({
    message: "API is under construction!",
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

apiRouter.use((req, res, next) => {
  if (req.user) {
    console.log("User is set:", req.user);
  }

  next();
});
// place your routers here
const userRouter = require("./users");
apiRouter.use("/users", userRouter);
//apiRouter.use("/products", productRouter);

module.exports = apiRouter;
