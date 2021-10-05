const express = require("express");
const router = express.Router();
const roles = require("../costants/userRole");

const adminControllers = require("../controllers/adminController");

const jwtServices = require("../services/jwtService");

router.get("/", adminControllers.mainPage);

router.use("/users", require("./userManagement"));

router.use("/properties", require("./propertyManagement"));

router.use(
  "/settings",
  jwtServices.authorize([roles.SuperAdmin]),
  require("./settings")
);

router.use(
  "/messages",
  jwtServices.authorize([roles.SuperAdmin, roles.Admin]),
  require("./messages")
);

module.exports = router;
