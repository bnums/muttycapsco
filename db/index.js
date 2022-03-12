const client = require("./client");

module.exports = {
  client,
  ...require("./user"),
  ...require("./reviews"),
};
