const Util = require("../utils/util");

const usersServices = require("../services/usersService");
const jwtServices = require("../services/jwtService");
const settingsServices = require("../services/settingsService");
const messagesServices = require("../services/messagesService");
const mailerServices = require("../services/mailerService");

const util = new Util();

module.exports = class MessagesController {
  static async messagesPage(req, res) {
    try {
      const username = await jwtServices.retrieveUser(req.cookies.token);
      const user = await usersServices.retrieveUser(username);
      const isLoggedIn = true;
      const settings = await settingsServices.getAllSettings();
      const messages = await messagesServices.getAllMessages();
      const unreadMessagesCount = await messagesServices.unreadMessages();
      const createdTime = await messagesServices.jalaaliCreatedTime(messages);
      return res.render("admin/messages/all", {
        title: `${settings[0].title} - پیام های دریافتی`,
        user,
        isLoggedIn,
        settings,
        messages,
        createdTime,
        unreadMessagesCount,
      });
    } catch (err) {
      console.log(err);
      util.setError(err, {}, 400);
      util.send(res);
    }
  }

  static async sendMessage(req, res) {
    try {
      const { name, email, tell, subject, message } = req.body;
      if (name && email && tell && subject && message) {
        await messagesServices.submitMessage(
          name,
          email,
          tell,
          subject,
          message
        );
        util.setSuccess("Your message send successfully", 200);
        return util.send(res);
      }
      util.setError({}, "Your request is empty", 404);
      return util.send(res);
    } catch (err) {
      console.log(err);
      util.setError(err, {}, 400);
      util.send(res);
    }
  }

  static async getSingleMessage(req, res) {
    try {
      const { id } = req.params;
      const username = await jwtServices.retrieveUser(req.cookies.token);
      const user = await usersServices.retrieveUser(username);
      const isLoggedIn = true;
      const settings = await settingsServices.getAllSettings();
      const message = await messagesServices.getSingleMessageWithMessageID(id);
      if (!message) {
        util.setError({}, "Message not found", 400);
        return util.send(res);
      }
      await messagesServices.changeReadStatus(message._id);
      const unreadMessagesCount = await messagesServices.unreadMessages();
      console.log(32323);
      return res.render("admin/messages/single", {
        title: `${settings[0].title} - پیام دریافتی`,
        user,
        isLoggedIn,
        settings,
        message,
        unreadMessagesCount,
      });
    } catch (err) {
      console.log(err);
      util.setError(err, {}, 400);
      util.send(res);
    }
  }

  static async sendReply(req, res) {
    try {
      const { messageID, userID, reply } = req.body;
      if (!reply) {
        util.setError({}, "Reply does not exist", 400);
        return util.send(res);
      }
      const message = await messagesServices.getSingleMessage(messageID);
      if (!message) {
        util.setError({}, "Message not found", 400);
        return util.send(res);
      }

      await mailerServices.replyMessage(message, reply);
      util.setSuccess("Reply has been sent", 200);
      return util.send(res);
    } catch (err) {
      console.log(err);
      util.setError(err, {}, 400);
      util.send(res);
    }
  }

  static async deleteMessage(req, res) {
    try {
      const { id } = req.body;
      if (!id) {
        util.setError(
          {},
          "Please send id of message that you want to delete",
          404
        );
        return util.send(res);
      }
      const message = await messagesServices.getSingleMessage(id);
      if (!message) {
        util.setError({}, "Message not found", 404);
        return util.send(res);
      }
      await messagesServices.deleteMessage(id);
      util.setSuccess("Message deleted successfully", 200);
      return util.send(res);
    } catch (err) {
      util.setError(err, {}, 400);
      util.send(res);
    }
  }

  static async getReadMessagesPage(req, res) {
    try {
      const username = await jwtServices.retrieveUser(req.cookies.token);
      const user = await usersServices.retrieveUser(username);
      const isLoggedIn = true;
      const settings = await settingsServices.getAllSettings();
      const unreadMessagesCount = await messagesServices.unreadMessages();
      const readMessages = await messagesServices.getReadMessages();
      const createdTime = await messagesServices.jalaaliCreatedTime(
        readMessages
      );
      return res.render("admin/messages/read", {
        title: `${settings[0].title} - پیام های خوانده شده`,
        user,
        isLoggedIn,
        settings,
        unreadMessagesCount,
        readMessages,
        createdTime,
      });
    } catch (err) {
      console.log(err);
      util.setError(err, {}, 400);
      util.send(res);
    }
  }

  static async getUnreadMessagesPage(req, res) {
    try {
      const username = await jwtServices.retrieveUser(req.cookies.token);
      const user = await usersServices.retrieveUser(username);
      const isLoggedIn = true;
      const settings = await settingsServices.getAllSettings();
      const unreadMessagesCount = await messagesServices.unreadMessages();
      const unreadMessages = await messagesServices.getUnreadMessages();
      const createdTime = await messagesServices.jalaaliCreatedTime(
        unreadMessages
      );
      return res.render("admin/messages/unread", {
        title: `${settings[0].title} - پیام های جدید`,
        user,
        isLoggedIn,
        settings,
        unreadMessagesCount,
        unreadMessages,
        createdTime,
      });
    } catch (err) {
      util.setError(err, {}, 400);
      util.send(res);
    }
  }
};
