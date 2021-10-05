const express = require("express");
const router = express.Router();

const homeControllers = require("../controllers/homeController");
const messagesControllers = require("../controllers/messagesController");

const jwtServices = require("../services/jwtService");

const roles = require("../costants/userRole");

router.get("/", homeControllers.getHome);

router.get("/search", homeControllers.search);

router.use("/auth", require("./auth"));

router.use(
  "/users",
  jwtServices.authorize([
    roles.Admin,
    roles.User,
    roles.Writer,
    roles.SuperAdmin,
  ]),
  require("./users")
);

router.use(
  "/admin",
  jwtServices.authorize([roles.Admin, roles.Writer, roles.SuperAdmin]),
  require("./admin")
);

router.use("/property", require("./property"));

router.use("/category", require("./category"));

router.use(
  "/like",
  jwtServices.authorize([
    roles.Admin,
    roles.Writer,
    roles.SuperAdmin,
    roles.User,
  ]),
  require("./like")
);

router.get("/contact", homeControllers.contactPage);

router.get("/about", homeControllers.aboutPage);

router.post("/message", messagesControllers.sendMessage);

module.exports = router;
