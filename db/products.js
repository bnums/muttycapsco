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

async function createProducts({
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
      INSERT INTO products(name, description, price, "inventoryQTY", category, "productImg")
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

async function updateProduct({ productId, ...productFields }) {
  try {
    const setString =
      Object.keys(productFields)
        .map((field, index) => {
          return `"${field}" = $${index + 1}`;
        })
        .join(", ") || "";
    const {
      rows: [product],
    } = await client.query(
      `
          UPDATE products
          SET ${setString}
          WHERE id= ${productId}
          RETURNING *;
        `,
      Object.values(productFields)
    );

    return product;
  } catch (error) {
    throw error;
  }
}

async function removeProduct(productId) {
  try {
    const {
      rows: [product],
    } = await client.query(
      `
              DELETE FROM products
              WHERE id=$1
              RETURNING *;
          `,
      [productId]
    );
    return product;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getAllProducts,
  getProductById,
  createProducts,
  updateProduct,
  removeProduct,
};
