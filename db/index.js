const client = require("./client");

module.exports = {
  client,
  ...require("./user"),
  ...require("./products"),
  ...require("./reviews"),
};
