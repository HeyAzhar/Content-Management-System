//Modules
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");

//Imports
const contentRoute = require("./Routes/Routes");
const adminRoute = require("./Routes/adminRoute");

//Middlewares
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/Assets", express.static("Assets"));

// if (process.env.NODE_ENV === "production") {
// Exprees will serve up production assets
app.use(express.static(path.join(__dirname, "cms-web/build")));

app.use("/az", contentRoute);
app.use("/az", adminRoute);
app.use("/az/test", (req, res) => {
  res.send("Hello World!");
});
// Express serve up index.html file if it doesn't recognize route
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/cms-web/build/index.html"));
});
// }

//connect with DB
// con.connect((err) => {
//   if (err) {
//     throw err;
//   }
//   console.log("$$$ CONNECTED TO DATABASE $$$");
// });

//Route

//PORT
const port = process.env.PORT || 3000;

//RUN
app.listen(port, () => {
  console.log(`### DB IS CONNECTED ON ${port} ###`);
});
