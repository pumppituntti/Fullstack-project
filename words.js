const express = require("express");
const connection = require("./connection.js");
var words = express.Router();
const Validator = require("jsonschema").Validator;
const validator = new Validator();

var schema = {
  properties: {
    fin: {
      type: "string",
      minLength: 1,
      maximum: 40,
    },
    eng: {
      type: "string",
      minimum: 1,
      maximum: 40,
    },
  },
};

words.use(express.json());

// words.get("/sort?", async (req, res) => {
//   try {
//     if (req.query.latitude !== undefined) {
//       console.log(req.query.latitude);
//       let key = `latitude`;
//       let result = await connection.sortBy(key);
//       res.send(result);
//     } else if (req.query.longitude !== undefined) {
//       let key = `longitude`;
//       let result = await connection.sortBy(key);
//       res.send(result);
//     } else {
//       res.sendStatus(400);
//     }
//   } catch (err) {
//     console.log(err);
//   }
// });

words.get("/", async (req, res) => {
  try {
    let result = await connection.findAll();
    res.send(result);
  } catch (err) {
    console.log(err);
  }
});

words.get("/:number([0-9]+)", async (req, res) => {
  try {
    let num = req.params.number;
    let result = await connection.findById(num);
    if (Object.keys(result).length !== 0) {
      res.send(result);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    console.log(err);
  }
});

words.post("/", async (req, res) => {
  try {
    let loc = req.body;
    let result = validator.validate(loc, schema);
    if (result.errors.length === 0) {
      console.log(await connection.save(loc));
      res.statusCode = 201;
      res.send(loc);
    } else {
      console.log("ERROR");
      res.statusCode = 400;
      res.send(res.statusCode + " Bad request\n" + result.errors);
    }
  } catch (err) {
    console.log(err);
  }
});

words.delete("/:number([0-9]+)", async (req, res) => {
  try {
    let num = req.params.number;
    console.log(await connection.deleteById(num));
    res.statusCode = 204;
    res.send(res.statusCode + "Deleted");
  } catch (err) {
    console.log(err);
  }
});

module.exports = words;
