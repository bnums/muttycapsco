const client = require("./client");

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

const getAllOrders = async () => {
  try {
    const { rows: order } = await client.query(
      `
        SELECT orders.*, users.username AS "shopperName" FROM orders
        JOIN users ON orders."userId" = users.id
        `,
      []
    );
    return order;
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
