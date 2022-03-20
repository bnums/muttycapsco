const express = require("express");
const ordersRouter = express.Router();

const {
    getAllOrders, createOrders,
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

ordersRouter.post('/', async (req, res, next) => {
    const {userId, orderTotal, createdAt} = req.body
    try{
        const createdOrder = await createOrders({userId, orderTotal, createdAt});
        res.send(createdOrder);

    }   catch (error){
        next(error)
    }
})

ordersRouter.patch

module.exports = ordersRouter;