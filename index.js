const express = require("express");
const words = require("./words.js");
const app = express();

const cors = require("cors");

const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.static("frontend/build"));
app.use(express.json());
app.use("/words", words);

/**
 * Start backend server
 */
const server = app.listen(port, () => {
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
