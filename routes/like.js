const express = require("express");
const router = express.Router();

const likeControllers = require("../controllers/likeController");

router.post("/submit", likeControllers.submit);

router.post("/remove", likeControllers.remove);

module.exports = router;
