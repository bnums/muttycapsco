// grab our db client connection to use with our adapters
const client = require("./client");
const bcrypt = require("bcrypt");
const SALT_ROUNDS = 10;

async function createUser({ username, password, email, isAdmin }) {
  const hashPassword = await bcrypt.hash(password, SALT_ROUNDS);
  try {
    const {
      rows: [user],
    } = await client.query(
      `
        INSERT INTO users(username, password, email, "isAdmin") 
        VALUES ($1, $2, $3, $4)
        ON CONFLICT (username) DO NOTHING
        RETURNING *;
      `,
      [username, hashPassword, email, isAdmin]
    );

    delete user.password;
    return user;
  } catch (error) {
    throw error;
  }
}

async function getAllUsers() {
  try {
    const { rows } = await client.query(
      `SELECT username, email, "isAdmin"
      FROM users;
    `
    );

    return rows;
  } catch (error) {
    throw error;
  }
}

async function getUserById(id) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
        SELECT * FROM users
        WHERE id = $1
      `,
      [id]
    );

    delete user.password;
    return user;
  } catch (error) {
    throw error;
  }
}

async function getUserByUsername(username) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
        SELECT * from users
        where username = $1;
      `,
      [username]
    );
    return user;
  } catch (error) {
    throw error;
  }
}

async function getUser({ username, password }) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
        SELECT * FROM users
        WHERE username = $1;
      `,
      [username]
    );

    if (!user) {
      throw {
        name: "userNotFound",
        message: "User not found ",
      };
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      delete user.password;
      return user;
    } else {
      console.log("password does not match!");
    }
  } catch (error) {
    throw error;
  }
}

async function removeUser(userId) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
              DELETE FROM users
              WHERE id=$1
              RETURNING *;
          `,
      [userId]
    );
    return user;
  } catch (error) {
    throw error;
  }
}
module.exports = {
  // add your database adapter fns here
  getAllUsers,
  createUser,
  getUserById,
  getUserByUsername,
  getUser,
  removeUser,
};
