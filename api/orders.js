const express = require("express");
const ordersRouter = express.Router();

const {
    getAllOrders,
} = require('../db');

// ordersRouter.use((req, res, next) => {
//     if(req.user) {
//         console.log("User is set:", req.user)
//     }
//     next();
//   })


ordersRouter.get('/', async (req, res, next ) => {
    try {
        const orders = await getAllOrders();
        res.send(orders);

    } catch (error) {
      next(error)
    }
})

module.exports = ordersRouter;