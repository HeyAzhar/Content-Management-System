const express = require("express");
const router = express.Router();
const { getContent, putContent } = require("../Controller/Controller");
const { authentication } = require("../Controller/adminController");

//Get Content DATA
router.get("/content", getContent);
//Change conent DATA
router.put("/content", authentication, putContent);

module.exports = router;
