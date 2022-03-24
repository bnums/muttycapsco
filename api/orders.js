const express = require("express");
const ordersRouter = express.Router();
const { requireUser } = require("./utils");

const {
    getAllOrders, 
    createOrders,
    updateOrder,
    deleteOrder,
    getOrderbyId,
} = require('../db');

ordersRouter.get('/', async (req, res, next ) => {
    try {
        const orders = await getAllOrders();
        res.send(
            orders
        );

    } catch (error) {
      next(error)
    }
});

ordersRouter.post('/', requireUser, async (req, res, next) => {
    const {orderTotal, createdAt} = req.body
    try{
        const createdOrder = await createOrders({
            userId: req.user.id, 
            orderTotal, 
            createdAt
        });
        res.send(createdOrder);

    }   catch (error){
        next(error)
    }
})

ordersRouter.patch("/:orderId", requireUser, async (req, res, next) => {
    const { orderId } = req.params;
    const { orderTotal, createdAt} = req.body;
  
    try {
      const order = await getOrderbyId(orderId);
      if (order.userId === req.user.id) {
        const updatedOrder = await updateOrder({
          id: orderId,
          orderTotal,
          createdAt
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

ordersRouter.delete("/:orderId", requireUser, async (req, res, next) => {
    try {
      const { orderId } = req.params;
      const order  = await getOrderbyId(orderId);
      if (order.userId === req.user.id) {
        const updatedOrder = await deleteOrder(orderId);
        res.send(updatedOrder);
        return
      }
    } catch ({ name, message }) {
      next({ name, message });
    }
  });

ordersRouter.post("/:orderId/products", requireUser ,async (req, res, next) => {
  const { orderId } = req.params;
  const productOrder = {...req.body, orderId}

  try{
    const orderProductPair = await addProductToOrder(productOrder);

    res.send(orderProductPair)
  }catch({ name, message}) {
    next({ name, message });
  }
})


module.exports = ordersRouter;