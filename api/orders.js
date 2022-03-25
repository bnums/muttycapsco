const express = require("express");
const ordersRouter = express.Router();
const { requireUser } = require("./utils");

const {
  getAllOrders,
  createOrders,
  updateOrder,
  deleteOrder,
  getOrderbyId,
  addProductToOrder,
} = require("../db");

//GET gets all orders
//TODO maybe think about making this get route available to only admins
ordersRouter.get("/", async (req, res, next) => {
  try {
    const orders = await getAllOrders();
    res.send(orders);
  } catch (error) {
    next(error);
  }
});

//POST creates a new order for a logged in user
ordersRouter.post("/", requireUser, async (req, res, next) => {
  const { orderTotal, createdAt } = req.body;
  try {
    const createdOrder = await createOrders({
      userId: req.user.id,
      orderTotal: orderTotal,
      createdAt: createdAt,
      isActive: true,
    });
    res.send(createdOrder);
  } catch (error) {
    next(error);
  }
});

//PATCH updates an order for a logged in user who is the owner of the order
ordersRouter.patch("/:orderId", requireUser, async (req, res, next) => {
  const { orderId } = req.params;
  const { orderTotal, createdAt } = req.body;

  try {
    const order = await getOrderbyId(orderId);
    if (order.userId === req.user.id) {
      const updatedOrder = await updateOrder({
        id: orderId,
        orderTotal: orderTotal,
        createdAt: createdAt,
      });
      res.send(updatedOrder);
      return;
    } else {
      next({
        name: "updateOrderError",
        message: "You must be logged in",
      });
    }
  } catch (error) {
    next(error);
  }
});

// deletes an order from the db currently requiring a user logged in
ordersRouter.delete("/:orderId", requireUser, async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const order = await getOrderbyId(orderId);
    if (order.userId === req.user.id) {
      const updatedOrder = await deleteOrder(orderId);
      res.send(updatedOrder);
      return;
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

// POST adds a product to an order /orders/:orderId/product
ordersRouter.post("/:orderId/products", requireUser, async (req, res, next) => {
  const { orderId } = req.params;
  const productOrder = { ...req.body, orderId: orderId };

  try {
    const orderProductPair = await addProductToOrder(productOrder);
    res.send(orderProductPair);
  } catch (error) {
    next(error);
  }
});

module.exports = ordersRouter;
