const express = require("express");
const router = express.Router();

const messagesControllers = require("../controllers/messagesController");

router.get("/", messagesControllers.messagesPage);

router.get("/read", messagesControllers.getReadMessagesPage);

router.get("/unread", messagesControllers.getUnreadMessagesPage);

router.get("/:id", messagesControllers.getSingleMessage);

router.post("/reply", messagesControllers.sendReply);

router.delete("/", messagesControllers.deleteMessage);

module.exports = router;
