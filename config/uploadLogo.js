const multer = require("multer");
const path = require("path");

module.exports = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/images/"));
  },
  filename: function (req, file, cb) {
    cb(null, `logo-${Date.now()}-${file.originalname}`);
  },
  fileFilter: function (req, file, cb) {
    // !file.originalname.match(/\.(jpg|jpeg|png)$/)
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(new Error("invalid type!"), false);
    }
  },
});
