const express = require("express");
const words = require("./words.js");
const app = express();

const cors = require("cors");

app.use(cors());

// app.use(express.static("frontend/public"));

app.use(express.static("frontend/build"));

app.use("/words", words);

/**
 * Start backend server
 */
const server = app.listen(8080, () => {
  console.log(`Listening on port ${server.address().port}`);
});

/**
 * Close backend server
 */
const shutdown = () => {
  console.log("Closing HTTP server");
  server.close(() => {
    console.log("Server closed");
  });
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
