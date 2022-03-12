const client = require("./client");

async function getAllProducts() {
  try {
    const { rows: products } = await client.query(`
      SELECT * FROM products
      `);
    return products;
  } catch (error) {
    throw error;
  }
}

async function getProductById(productId) {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
      SELECT * FROM products
      WHERE id = $1
      `,
      [productId]
    );
    return product;
  } catch (error) {
    throw error;
  }
}

async function createProduct({
  name,
  description,
  price,
  inventoryQTY,
  category,
  productImg,
}) {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
      INSERT INTO products(name, description, price, inventoryQTY, category, productImg)
      VALUES($1,$2,$3,$4,$5,$6)
      RETURNING*;
      `,
      [name, description, price, inventoryQTY, category, productImg]
    );
    return product;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getAllProducts,
  createProduct,
  // updateProduct,
  // deleteProduct,
  getProductById,
};
