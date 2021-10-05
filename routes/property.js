const express = require("express");
const router = express.Router();
const multer = require("multer");
const roles = require("../costants/userRole");

const propertyControllers = require("../controllers/propertyController");

const jwtServices = require("../services/jwtService");

const uploadPropertyImageStorage = require("../config/uploadPropertyImage");

const upload = multer({
  storage: uploadPropertyImageStorage,
});

const cpUpload = upload.fields([
  { name: "mainPicture", maxCount: 1 },
  { name: "otherPictures", maxCount: 8 },
]);

router.get(
  "/submit",
  jwtServices.checkUserOrAdmin([roles.Admin, roles.Writer, roles.SuperAdmin]),
  propertyControllers.getSubmitPropertyPage
);

router.post("/submit", cpUpload, propertyControllers.submitProperty);

router.get("/:id", propertyControllers.getSingleProperty);

module.exports = router;
