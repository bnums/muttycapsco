// grab our db client connection to use with our adapters
const client = require('../client');
const bcrypt = require("bcrypt");
const SALT_ROUNDS = 10;

async function createUser({ username, password, email, isAdmin }) {
  const hashPassword = await bcrypt.hash(password, SALT_ROUNDS);
  try {
    const {
      rows: [user],
    } = await client.query(
      `
        INSERT INTO users(username, password, email, isAdmin) 
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
  /* this adapter should fetch a list of users from your db */
}
module.exports = {
  // add your database adapter fns here
  getAllUsers,
  createUser,
};