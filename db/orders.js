const client = require("./client");

const addItemsToOrder = async (orders) => {
  try {
    const orderIdArray = orders.map((order) => {
      return order.id;
    });

    const { rows: products } = await client.query(`
      SELECT products.id, products.name, orderDetails.quantity, orderDetails."unitPrice", orderDetails."orderId" FROM products 
      JOIN orderDetails ON products.id = orderDetails."productId"
      WHERE orderDetails."orderId" IN (${orderIdArray});
      `);

    orders.forEach((order) => {
      order.items = products.filter((product) => order.id === product.orderId);
    });

    return orders;
  } catch (error) {
    throw error;
  }
};

async function createOrders({ userId, orderTotal, createdAt, isActive }) {
  try {
    const {
      rows: [order],
    } = await client.query(
      `
        INSERT INTO orders("userId", "orderTotal", "createdAt", "isActive")
        VALUES ($1, $2, $3, $4)
        RETURNING *;
        `,
      [userId, orderTotal, createdAt, isActive]
    );
    return order;
  } catch (error) {
    throw error;
  }
}

// getsAllOrders
// selects and returns all order on db, including their items
const getAllOrders = async () => {
  try {
    const { rows: orders } = await client.query(
      `
        SELECT orders.*, users.username AS "shopperName" FROM orders
        JOIN users ON orders."userId" = users.id
        `,
      []
    );
    return await addItemsToOrder(orders);
  } catch (error) {
    throw error;
  }
};

async function getOrderbyId(id) {
  try {
    const { rows: order } = await client.query(
      `
            SELECT * 
            FROM orders
            WHERE id = $1
        `,
      [id]
    );

    return order;
  } catch (error) {
    throw error;
  }
}

//getOrdersByUserId
// gets all orders made by a user, includes items on the order itself
async function getOrdersByUserId(userId) {
  try {
    const { rows: order } = await client.query(
      `
            SELECT * 
            FROM orders
            WHERE "userId" = $1
        `,
      [userId]
    );

    return order;
  } catch (error) {
    throw error;
  }
}

async function updateOrder({ id, ...fields }) {
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}" = $${index + 1}`)
    .join(", ");

  if (setString.length === 0) {
    return;
  }
  const valuesArray = [...Object.values(fields), id];

  try {
    const {
      rows: [updatedOrder],
    } = await client.query(
      `
          UPDATE orders
          SET ${setString}
          WHERE id = $${valuesArray.length}
          RETURNING *;
        `,
      valuesArray
    );

    return updatedOrder;
  } catch (error) {
    throw error;
  }
}

async function deleteOrder(id) {
  try {
    const {
      rows: [order],
    } = await client.query(
      `
            DELETE FROM orders
            WHERE id = $1
            RETURNING *;
        `,
      [id]
    );

    return order;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createOrders,
  getAllOrders,
  getOrderbyId,
  getOrdersByUserId,
  updateOrder,
  deleteOrder,
};
