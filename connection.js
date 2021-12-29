const mysql = require("mysql");
require("dotenv").config();

const connection = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DB,
});

let connectionFunctions = {
  connect: () =>
    new Promise((resolve, reject) => {
      connection.connect((err) => {
        reject(err);
      });
      resolve();
    }),

  close: () =>
    new Promise((resolve, reject) => {
      connection.end((err) => {
        reject(err);
      });
      resolve();
    }),

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

  findAll: () => {
    return new Promise((resolve, reject) => {
      connection.query("select * from words", (err, words) => {
        if (err) {
          reject(err);
        } else {
          resolve(words);
        }
      });
    });
  },

  sortBy: (key) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `select * from words order by ${key}, id`,
        (err, words) => {
          if (err) {
            reject(err);
          } else {
            resolve(words);
          }
        }
      );
    });
  },

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

  filter: (query) => {
    return new Promise((resolve, reject) => {
      let sql = `select * from words where ${query} `;
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
