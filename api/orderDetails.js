const express = require("express");
const orderDetailsRouter = express.Router();
const { requireUser } = require("./utils");

const { updateQuantity, deleteItem } = require("../db");

//PATCH /orderDetails/:orderDetailId
// updates the quantity amount of a product on an order
orderDetailsRouter.patch(
  "/:orderDetailId",
  requireUser,
  async (req, res, next) => {
    try {
      const { orderDetailId } = req.params;
      const { quantity } = req.body;
      const updatedItem = await updateQuantity(orderDetailId, quantity);
      res.send(updatedItem);
    } catch (error) {
      next(error);
    }
  }
);

//DELETE removes an item entirely from an order, returns id for filter
orderDetailsRouter.delete(
  "/:orderDetailId",
  requireUser,
  async (req, res, next) => {
    try {
      const { orderDetailId } = req.params;
      const { productId } = await deleteItem(orderDetailId);
      res.send({
        success: true,
        message: "Item successfully removed from your cart",
        productId: productId,
      });
    } catch (error) {
      next({
        name: "DeleteError",
        message: "Unable to delete this item from your cart",
      });
    }
  }
);

module.exports = orderDetailsRouter;
