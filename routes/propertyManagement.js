const express = require("express");
const router = express.Router();
const multer = require("multer");
const roles = require("../costants/userRole");

const propertyManagementControllers = require("../controllers/propertyManagementController");

const jwtServices = require("../services/jwtService");

const uploadPropertyImageStorage = require("../config/uploadPropertyImage");

const upload = multer({
  storage: uploadPropertyImageStorage,
});

const cpUpload = upload.fields([
  { name: "mainPicture", maxCount: 1 },
  { name: "otherPictures", maxCount: 8 },
]);

router.get("/submit", propertyManagementControllers.submitPage);

router.get("/status", propertyManagementControllers.propertyStatusPage);

router.post("/status", propertyManagementControllers.submitPropertyStatus);

router.put("/status", propertyManagementControllers.editPropertyStatus);

router.delete("/status", propertyManagementControllers.deletePropertyStatus);

router.post(
  "/status/getOne",
  propertyManagementControllers.getSinglePropertyStatus
);

router.get("/categories", propertyManagementControllers.propertyCategoriesPage);

router.post(
  "/category",
  propertyManagementControllers.submitPropertyCategories
);

router.put("/category", propertyManagementControllers.editPropertyCategory);

router.delete(
  "/category",
  propertyManagementControllers.deletePropertyCategory
);

router.post(
  "/category/getOne",
  propertyManagementControllers.getSinglePropertyCategory
);

router.get("/facility", propertyManagementControllers.propertyFacilitiesPage);

router.post("/facility", propertyManagementControllers.submitPropertyFacility);

router.post(
  "/facility/getOne",
  propertyManagementControllers.getSinglePropertyFacility
);

router.put("/facility", propertyManagementControllers.editPropertyFacility);

router.delete(
  "/facility",
  propertyManagementControllers.deletePropertyFacility
);

router.post("/", cpUpload, propertyManagementControllers.submitProperty);

router.get("/", propertyManagementControllers.propertiesManagementPage);

router.get(
  "/pending",
  jwtServices.authorize([roles.Admin, roles.SuperAdmin]),
  propertyManagementControllers.getPendingPropertiesPage
);

router.put("/pending", propertyManagementControllers.changePendingProperies);

router.get("/edit/:id", propertyManagementControllers.editPropertyPage);

router.put("/edit", cpUpload, propertyManagementControllers.editProperty);

router.delete("/", propertyManagementControllers.deleteProperty);

router.post(
  "/send/telegram",
  propertyManagementControllers.sendPropertyTelegram
);

module.exports = router;
