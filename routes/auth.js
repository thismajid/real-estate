const express = require("express");
const router = express.Router();
const passport = require("passport");

const authValidator = require("../services/validators/authValidator");

const authControllers = require("../controllers/authController");

router.get("/register", authControllers.registerPage);
router.post("/register", authValidator.register, authControllers.register);

router.get("/login", authControllers.loginPage);
router.post("/login", authValidator.login, authControllers.login);

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  authControllers.googleAuth
);

router.get("/reset", authControllers.resetPasswordMainPage);

router.post("/reset/request", authControllers.resetPasswordRequest);

router.get("/reset/:token", authControllers.resetPasswordPage);

router.put("/reset", authControllers.resetPassword);

// router.post("/reset/password", authControllers.resetPassword);

router.get("/logout", authControllers.logout);

module.exports = router;
