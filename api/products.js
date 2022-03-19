const {
  getProductById,
  createProducts,
  updateProduct,
  removeProduct,
  getAllProducts,
} = require("../db");
const { requireUser } = require("./utils");
const productRouter = require("express").Router();

// GET/products
productRouter.get("/", async (req, res, next) => {
  try {
    const products = await getAllProducts();
    res.send(products);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

// GET/products/:productId
productRouter.get("/:productId", async (req, res, next) => {
  const { productId } = req.params;
  try {
    const product = await getProductById(productId);
    res.send(product);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

//POST/products
productRouter.post("/", requireUser, async (req, res, next) => {
  try {
    const {
      name,
      description,
      price,
      inventoryQTY,
      category,
      productImg = "",
    } = req.body;
    const products = await createProducts({
      name,
      description,
      price,
      inventoryQTY,
      category,
      productImg,
    });
    res.send(products);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

//PATCH/products/:productId
productRouter.patch("/:productId", requireUser, async (req, res, next) => {
  const { productId } = req.params;
  try {
    const toUpdateProduct = { ...req.body, productId };
    const updatedProduct = await updateProduct(toUpdateProduct);
    res.send(updatedProduct);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

// DELETE/products/:productId
productRouter.delete("/:productId", requireUser, async (req, res, next) => {
  const { productId } = req.params;
  //   const product = await getProductById(productId);

  try {
    const deletedProduct = await removeProduct(productId);
    res.send(deletedProduct);
  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = productRouter;
