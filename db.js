require("dotenv").config();
const mysql = require("mysql");

//connecting with database
const con = mysql.createPool({
  host: "us-cdbr-east-02.cleardb.com",
  user: "b2888535dd25b6",
  password: "31c59c43",
  database: "heroku_0f361a6d4f918e1",
});

module.exports = con;
