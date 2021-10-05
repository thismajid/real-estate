const express = require("express");
const router = express.Router();
const multer = require("multer");

const usersControllers = require("../controllers/usersController");

const uploadAvatarStorage = require("../config/uploadAvatar");

const upload = multer({
  storage: uploadAvatarStorage,
});

router.get("/profile", usersControllers.profilePage);

router.put("/profile", usersControllers.profileEdit);

router.get("/avatar", usersControllers.avatarPage);

router.put("/avatar", upload.single("avatar"), usersControllers.changeAvatar);

// router.post("/profile/avatar", usersControllers.profileAvatar);

router.get("/reset/password/:id", usersControllers.resetPasswordPage);

router.put("/reset/password", usersControllers.resetPassword);

module.exports = router;
