const apiRouter = require("express").Router();
//const productRouter = require("./products");
apiRouter.get("/", (req, res, next) => {
  res.send({
    message: "API is under construction!",
  });
});

apiRouter.get("/health", (req, res, next) => {
  res.send({
    healthy: true,
  });
});

// place your routers here

//apiRouter.use("/products", productRouter);

module.exports = apiRouter;
