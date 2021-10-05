const express = require("express");
const router = express.Router();

const adminControllers = require("../controllers/adminController");

router.get("/all", adminControllers.getAllUsers);

router.get("/active", adminControllers.getActiveUsers);

router.get("/deactive", adminControllers.getDeactiveUsers);

router.post("/", adminControllers.getUserById);

router.patch("/update/role", adminControllers.updateRole);

router.patch("/update/status", adminControllers.updateStatus);

router.post("/reset/password", adminControllers.resetPassword);

module.exports = router;
