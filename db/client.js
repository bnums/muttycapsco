// Connect to DB

const { Client } = require("pg");

// change the DB_NAME string to whatever your group decides on
const DB_NAME = "shopper-dev";

const DB_URL =
  process.env.DATABASE_URL || `postgres://localhost:5432/${DB_NAME}`;

console.log("... DB URL", DB_URL);
const client = new Client(DB_URL);

module.exports = client;
