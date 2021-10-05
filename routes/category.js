const express = require("express");
const router = express.Router();

const categoryConrollers = require("../controllers/categoryController");

router.get("/:name", categoryConrollers.getCategoryPage);

module.exports = router;
