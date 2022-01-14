const mysql = require("mysql");
require("dotenv").config();

/**
 * Creating a pool for connecting to the database
 */
const connection = mysql.createPool({
  connectionLimit: 10,
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
});

let connectionFunctions = {
  /**
   * Database connection
   * @returns promise object on which the connect() function is called
   */
  connect: () =>
    new Promise((resolve, reject) => {
      connection.connect((err) => {
        reject(err);
      });
      resolve();
    }),

  /**
   * Closing the connection to the database
   * @returns promise object on which the end() function is called
   */
  close: () =>
    new Promise((resolve, reject) => {
      connection.end((err) => {
        reject(err);
      });
      resolve();
    }),

  /**
   * The function saves the new object (word) to the database
   * @param {object} word object with id, fin, eng fields
   * @returns promise object in which the new object is added to the database
   */
  save: (word) => {
    return new Promise((resolve, reject) => {
      let sql =
        "insert into words (fin, eng) values (" +
        connection.escape(word.fin) +
        ", " +
        connection.escape(word.eng) +
        ")";
      connection.query(sql, (err, words) => {
        if (err) {
          reject(err);
        } else {
          resolve("Successfully saved!");
        }
      });
    });
  },

  /**
   * This function updates the values of the object in the database
   * @param {object} word object with id, fin, eng fields
   * @returns promise object in which the object is updated in the database
   */
  editWord: (word) =>
    new Promise((resolve, reject) => {
      connection.query(
        "update words set fin = " +
          connection.escape(word.fin) +
          ", eng = " +
          connection.escape(word.eng) +
          "where id = " +
          connection.escape(word.id),
        (err, words) => {
          if (err) {
            reject("data can't be edited for some reason, please try again");
          }
          if (words.affectedRows == 0) {
            reject("No such word");
          } else {
            resolve("Edited word succesfully");
          }
        }
      );
    }),

  /**
   * This function returns all elements of the database
   * @returns promise object in which the query is made to the database
   */
  findAll: () => {
    return new Promise((resolve, reject) => {
      connection.query("select * from words", (err, words) => {
        if (err) {
          reject(err);
        } else {
          console.log("GET");
          resolve(words);
        }
      });
    });
  },

  /**
   * This function deletes an object from the database by id
   * @param {number} id - id of the element to be removed from the database
   * @returns promise object in which the query is made to the database
   */
  deleteById: (id) => {
    return new Promise((resolve, reject) => {
      let sql = "delete from words where id = " + connection.escape(id);
      connection.query(sql, (err, words) => {
        if (err) {
          reject(err);
        } else {
          resolve("Successfully deleted!");
        }
      });
    });
  },

  /**
   * This function finds an object in the database by id
   * @param {number} id - id of the element to be found
   * @returns promise object in which the query is made to the database
   */
  findById: (id) => {
    return new Promise((resolve, reject) => {
      let sql = "select * from words where id = " + connection.escape(id);
      connection.query(sql, (err, words) => {
        if (err) {
          reject(err);
        } else {
          resolve(words);
        }
      });
    });
  },
};

module.exports = connectionFunctions;
