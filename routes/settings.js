const express = require("express");
const router = express.Router();
const multer = require("multer");

const settingsControllers = require("../controllers/settingsController");

const uploadLogoStorage = require("../config/uploadLogo");

const upload = multer({
  storage: uploadLogoStorage,
});

const cpUpload = upload.fields([
  { name: "headerLogo", maxCount: 1 },
  { name: "footerLogo", maxCount: 1 },
]);

router.get("/", settingsControllers.getSettingsPage);

router.get("/contact", settingsControllers.getContactPage);

router.get("/socials", settingsControllers.getSocialPage);

router.put("/contact", settingsControllers.contact);

router.post("/main", cpUpload, settingsControllers.main);

router.post("/socials", settingsControllers.socialNetworks);

router.get("/about", settingsControllers.about);

router.post("/about", settingsControllers.setAbout);

router.get("/bot", settingsControllers.getBotPage);

router.post("/bot", settingsControllers.updateTokenAndChannelID);

module.exports = router;
