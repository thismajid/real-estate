const Messages = require("../models/messages");
const moment = require("moment-jalaali");

const randomstring = require("randomstring");

module.exports = class MessagesService {
  static async submitMessage(name, email, tell, subject, message) {
    try {
      const messageID = randomstring.generate(10);
      return await new Messages({
        name,
        email,
        tell,
        subject,
        message,
        messageID,
      }).save();
    } catch (err) {
      throw err;
    }
  }

  static async getAllMessages() {
    try {
      return await Messages.find().sort({ createdAt: -1 }).exec();
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  static async jalaaliCreatedTime(messages) {
    try {
      const createdTime = [];
      for (let index = 0; index < messages.length; index++) {
        createdTime[index] = moment(messages[index].createdAt).format(
          "HH:mm - jYYYY/jM/jD"
        );
      }
      return createdTime;
    } catch (err) {
      throw err;
    }
  }

  static async getSingleMessageWithMessageID(messageID) {
    try {
      return await Messages.findOne({ messageID });
    } catch (err) {
      throw err;
    }
  }

  static async changeReadStatus(id) {
    try {
      return await Messages.findByIdAndUpdate(
        id,
        {
          read: "Yes",
        },
        { new: true }
      );
    } catch (err) {
      throw err;
    }
  }

  static async getSingleMessage(id) {
    try {
      return await Messages.findById(id);
    } catch (err) {
      throw err;
    }
  }

  static async deleteMessage(id) {
    try {
      return await Messages.findByIdAndDelete(id);
    } catch (err) {
      throw err;
    }
  }

  static async unreadMessages() {
    try {
      return await Messages.find({ read: "No" }).countDocuments().exec();
    } catch (err) {
      throw err;
    }
  }

  static async getReadMessages() {
    try {
      return await Messages.find({ read: "Yes" })
        .sort({ createdAt: -1 })
        .exec();
    } catch (err) {
      throw err;
    }
  }

  static async getUnreadMessages() {
    try {
      return await Messages.find({ read: "No" }).sort({ createdAt: -1 }).exec();
    } catch (err) {
      throw err;
    }
  }
};
