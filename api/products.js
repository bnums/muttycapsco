//const productRouter = require('express').Router();

// GET/products
// Request Parameters: none
// Return Parameters:
/*
[
    {
        id: productId
        name: product name
        description: product Description 
        price: product price
        inventoryQTY: inventory quantity
        category: product category
        productImg: product image 
    }
]
*/
// productRouter.get("/", async (req, res, next) => {
//     try {
//       const products = await getAllProducts();
//       res.send(products);
//     } catch ({ name, message }) {
//       next({ name, message });
//     }
//   });

// GET/products/:productId
// Request Parameters: productId

// Return Parameters:
/*
[
     {
id: productId
name: product name
description: product Description 
price: product price
inventoryQTY: inventory quantity
category: product category
productImg: product image 
}
 ]
*/

// productRouter.get("/:productId", async (req, res, next) => {
//   const { productId } = req.params;
//   try {
//
//   } catch ({ name, message }) {
//     next({ name, message });
//   }
// });

//POST/products
//Request Parameters:
/*
[
    name
    description
    price
    inventoryQTY
    category
    productImg
]
/*

//Return Parameters:
/*
[
    name
    description
    price
    inventoryQTY
    category
    productImg
]
/*

// productRouter.post("/", requireUser, async (req, res, next) => {
//     try {
//       
//     } catch ({ name, message }) {
//       next({ name, message });
//     }
//   });

//PATCH/products/:productId
// Request Parameters:
/*
[
    name
    description
    price
    inventoryQTY
    category
    productImg
]
/*
// Return Parameters:
/*
[
     Id
    name
    description
    price
    inventoryQTY
    category
    productImg
]
*/

// productRouter.patch("/:productId", async (req, res, next) => {
//     const { productId } = req.params;
//     try {
//
//     } catch ({ name, message }) {
//       next({ name, message });
//     }
//   });

// DELETE/products/:productId
// Request Parameters: none

// Return Parameters:
/*
[
    message
    Id
    name
    description
    price
    inventoryQTY
    category
    productImg
]
*/
// productRouter.delete("/:productId",requireUser, async (req, res, next) => {
//       const { productId } = req.params;

//       try {

//       } catch ({ name, message }) {
//         next({ name, message });
//       }
//     }
//   );
