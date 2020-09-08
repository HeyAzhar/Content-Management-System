require("dotenv").config;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const con = require("../db");

//handle signup
exports.adminSignup = async (req, res) => {
  const password = req.body.password;
  // const salt = bcrypt.genSalt();
  const exncyPass = await bcrypt.hash(password, 10);

  const admin = {
    admin: req.body.admin,
    password: exncyPass,
  };
  if (!admin) {
    return res.send("Inputs can't be ampty");
  }

  //Rgister new admin
  con.query("INSERT INTO admins SET ?", admin, (error, results, fields) => {
    if (error) {
      res.status(400).send("Connection Error");
    } else {
      res.status(200).send("Admin created successfully");
    }
  });
};

//handle login
exports.adminLogin = async (req, res) => {
  const admin = req.body.admin;
  const password = req.body.password;
  const user = {
    admin: admin,
    password: password,
  };

  if (admin && password) {
    con.query(
      `SELECT * FROM admins WHERE admin = ?`,
      [admin],
      async (error, results, fields) => {
        if (error) {
          return console.log(error);
        }
        if (results.length > 0) {
          const comparision = await bcrypt.compare(
            password,
            results[0].password
          );
          if (comparision) {
            // res.status(200).send("Login Successfull");
            const token = jwt.sign(user, process.env.SECRET, {
              expiresIn: "100m",
            });
            res.send(token);
          } else {
            res.status(400).send("Id & password didn't match");
          }
        } else {
          res.send("No User Found!");
        }
      }
    );
  } else {
    res.send("Inputs can't be empty");
  }
};

//authentication
exports.authentication = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.status(403).send("ACCESS DENIED");

  jwt.verify(token, process.env.SECRET, (err, user) => {
    if (err) return res.status(401).send(err.message);
    req.user = user;
    next();
  });
};
