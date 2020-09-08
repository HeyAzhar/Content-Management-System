const express = require("express");
const router = express.Router();
const { adminLogin, adminSignup } = require("../Controller/adminController");

//handle admin login
router.post("/admin/login", adminLogin);

router.post("/admin/signup", adminSignup);

module.exports = router;
