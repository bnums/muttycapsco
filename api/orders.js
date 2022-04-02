const express = require("express");
const ordersRouter = express.Router();
const { requireUser } = require("./utils");

const {
  getAllOrders,
  getOrderById,
  createOrders,
  updateOrder,
  deleteOrder,
  addProductToOrder,
} = require("../db");

//GET gets all orders
ordersRouter.get("/", async (req, res, next) => {
  try {
    const orders = await getAllOrders();
    res.send(orders);
  } catch (error) {
    next(error);
  }
});

//POST /orders creates a new order for a logged in user
ordersRouter.post("/", async (req, res, next) => {
  const { orderTotal, createdAt, userId } = req.body;
  try {
    const createdOrder = await createOrders({
      userId: userId,
      orderTotal: orderTotal,
      createdAt: createdAt,
      isActive: true,
    });
    res.send(createdOrder);
  } catch (error) {
    next(error);
  }
});

//PATCH orders/:orderId
//updates an order for a logged in user who is the owner of the order
ordersRouter.patch("/:orderId", requireUser, async (req, res, next) => {
  const { orderId } = req.params;
  const userId = req.user.id;
  const { orderTotal, isActive } = req.body;
  const order = await getOrderById(orderId);

  let updateFields = {
    id: orderId,
    userId: order.userId,
    orderTotal: order.orderTotal,
    createdAt: order.createdAt,
    isActive: order.isActive,
  };

  if (isActive != null) {
    updateFields.isActive = isActive;
  }
  if (orderTotal) {
    updateFields.orderTotal = orderTotal;
  }

  try {
    if (order.userId === userId) {
      const updatedOrder = await updateOrder(updateFields);
      res.send(updatedOrder);
      return;
    } else {
      next({
        name: "UpdateOrderError",
        message: "You are not the owner of this order",
      });
    }
  } catch (error) {
    next(error);
  }
});

// DELETE /orders/:orderId
// deletes an order from the db currently requiring a user logged in
ordersRouter.delete("/:orderId", requireUser, async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const order = await getOrderById(orderId);
    if (order.userId === req.user.id) {
      await deleteOrder(orderId);
      res.send({
        success: true,
        message: "Order successfully deleted",
        orderId: orderId,
      });
    } else {
      next({
        name: "DeleteOrderError",
        message: "You are not the owner of this order",
      });
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

// POST /orders/:orderId/products
// adds a product to an order /orders/:orderId/product
ordersRouter.post("/:orderId/products", async (req, res, next) => {
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
