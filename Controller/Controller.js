const { v4: uuidv4 } = require("uuid");
const multer = require("multer");
const path = require("path");

//imports
const con = require("../db");

//===Config multer===
//Where to upload the images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./Assets");
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4() + path.extname(file.originalname));
  },
});
//Filtering Image
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(new Error("Please upload only JPEG or PNG image"));
  }
};
//Use Multer
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
}).fields([
  { name: "headerImage", maxCount: 1 },
  { name: "infoImgOne", maxCount: 1 },
  { name: "infoImgTwo", maxCount: 1 },
  { name: "infoImgThree", maxCount: 1 },
]);

//Route controllers
//GET
exports.getContent = (req, res) => {
  con.query("SELECT * FROM content", (error, results, fields) => {
    if (error) {
      return req.status(400).json({
        error: "Failed to get contnet from DB",
      });
    }
    res.send(results);
  });
};

//PUT
exports.putContent = (req, res) => {
  upload(req, res, function (err) {
    //handle error
    if (err) {
      console.log(err);
    }

    //=== if uploaded without image ==
    var formData = {
      primaryColor: req.body.primaryColor,
      secondaryColor: req.body.secondaryColor,
      heroText: req.body.heroText,
      infoTitileOne: req.body.infoTitileOne,
      infoTitileTwo: req.body.infoTitileTwo,
      infoTitileThree: req.body.infoTitileThree,
      infoTextOne: req.body.infoTextOne,
      infoTextTwo: req.body.infoTextTwo,
      infoTextThree: req.body.infoTextThree,
      footerText: req.body.footerText,
    };
    //render images
    if (req.files.headerImage) {
      const path = req.files.headerImage[0].path;
      formData.headerImage = path;
    }
    if (req.files.infoImgOne) {
      const path = req.files.infoImgOne[0].path;
      formData.infoImgOne = path;
    }
    if (req.files.infoImgTwo) {
      const path = req.files.infoImgTwo[0].path;
      formData.infoImgTwo = path;
    }
    if (req.files.infoImgThree) {
      const path = req.files.infoImgThree[0].path;
      formData.infoImgThree = path;
    }
    // console.log(formData);
    ///update to DB
    con.query(
      `UPDATE content SET ? WHERE id=1`,
      [formData],
      (error, results, fields) => {
        //handle error
        if (error) {
          return console.log(error);
        }
        //return result
        // console.log(results);
        res.json(results);
      }
    );
  });
};
