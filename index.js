// This is the Web app
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());

// create logs for everything
const morgan = require("morgan");
app.use(morgan("dev"));

// handle application/json requests
app.use(express.json());

// here's our static files
const path = require("path");
app.use(express.static(path.join(__dirname, "build")));

// here's our API
app.use("/api", require("./api"));

// by default serve up the react app if we don't recognize the route
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// bring in the DB connection
const { client } = require("./db");

// connect to the server
const PORT = process.env.PORT || 4000;

app.use(({ name, message }, req, res, next) => {
  res.status(500).send({ name: name, message: message });
});

// define a server handle to close open tcp connection after unit tests have run
const handle = app.listen(PORT, async () => {
  console.log(`server is running on ${PORT}`);

  // if app is running in github actions context skip db connection
  if (!process.env.CI) {
    try {
      await client.connect();
      console.log("Database is open for business!");
    } catch (error) {
      console.error("Database is closed for repairs!\n", error);
    }
  }
});

// export server and handle for routes/*.test.js
module.exports = { app, handle };
