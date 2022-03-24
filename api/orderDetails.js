const express = require("express");
const orderDetailsRouter = express.Router();
const { requireUser } = require("./utils");

const {
    addProductToOrder, 
    getProductByOrderId,
    getOrderByDate,
    updateQuantity,
    deleteItem,
} = require('../db');

orderDetailsRouter.patch('/:orderDetailsId', requireUser, async (req, res, next) => {

    const { orderDetailsId: id } = req.params
    const { quantity, unitPrice, createdAt } = req.body
    const updateFields = { id }

    if (quantity) {
      updateFields.quantity = quantity
    }
    if (unitPrice) {
      updateFields.unitPrice = unitPrice
    }
    if (createdAt) {
        updateFields.createdAt = createdAt
    }

    try {
      const order_detail = await getProductByOrderId(id)
      if (!order_detail)
        throw {
          name: `OrderDetailsIdError`,
          message: `id provided does not match with any existing user account`,
        }
      const order = await getProductByOrderId(order_detail.orderId)
      if (req.user.id === order.userId) {
        const newOrderDetail = await updateOrderDetail(updateFields)
        res.send(newOrderDetail)
      } else {
        next({
          name: `AuthorizationError`,
          message: `User must be logged in to update`,
        })
      }
    } catch (error) {
      next(error)
    }
  });







 
  orderDetailsRouter.patch("/:orderDetailsId", requireUser, async (req, res, next) => {
    const { orderDetailId } = req.params;
    const { quantity, unitPrice, createdAt} = req.body;
  
    try {
      const orderDetail = await getProductByOrderId(orderDetailId);
      if (orderDetail.userId === req.user.id) {
        const updatedOrderDetail = await updateOrderDetail({
          id: orderId,
          quantity,
          unitPrice,
          createdAt
        });
        res.send(updatedOrderDetail);
        return;
      } else {
        next({
          name: "updateOrderDetailError",
          message: "You must be logged in",
        });
      }
    } catch (error) {
      next(error);
    }
  });









  orderDetailsRouter.delete('/:orderDetailsId', requireUser, async (req, res, next) => {
    const { orderDetailsId } = req.params;
  
    try {
      const { orderId } = await addProductToOrder(orderDetailsId);
      const order = await addProductToOrder(orderId);
      if (req.user.id !== order.userId) {
        next({
          name: "InvalidUser",
          message: "You are not logged in"
        });
        return;
      }
      const deletedOrders = await deleteItem(orderDetailsId)
  
      res.send(deletedOrders)
    } catch ({ name, message }) {
      next({ name, message });
    }
  });




module.exports = orderDetailsRouter;