const Util = require("../utils/util");
const UniqueStringGenerator = require("unique-string-generator");

const authServices = require("../services/authService");
const usersServices = require("../services/usersService");
const jwtServices = require("../services/jwtService");
const mailerServices = require("../services/mailerService");
const settingsServices = require("../services/settingsService");
const messagesServices = require("../services/messagesService");

const util = new Util();

module.exports = class adminController {
  static async mainPage(req, res, next) {
    try {
      const username = await jwtServices.retrieveUser(req.cookies.token);
      const user = await usersServices.retrieveUser(username);
      const isLoggedIn = true;
      const settings = await settingsServices.getAllSettings();
      const unreadMessagesCount = await messagesServices.unreadMessages();
      return res.render("admin/main", {
        title: `${settings[0].title} - پنل مدیریت`,
        user,
        isLoggedIn,
        settings,
        unreadMessagesCount,
      });
    } catch (err) {
      util.setError(err, {}, 400);
      util.send(res);
    }
  }

  static async getAllUsers(req, res, next) {
    try {
      console.log(212121);
      const username = await jwtServices.retrieveUser(req.cookies.token);
      const user = await usersServices.retrieveUser(username);
      const isLoggedIn = true;
      const users = await usersServices.getAllUsersExceptRequestedID(user._id);
      const settings = await settingsServices.getAllSettings();
      const unreadMessagesCount = await messagesServices.unreadMessages();
      return res.render("admin/users/allUsers", {
        title: `${settings[0].title} - همه کاربران`,
        user,
        users,
        isLoggedIn,
        settings,
        unreadMessagesCount,
      });
    } catch (err) {
      console.log(err);
      util.setError(err, {}, 400);
      util.send(res);
    }
  }

  static async getActiveUsers(req, res, next) {
    try {
      const username = await jwtServices.retrieveUser(req.cookies.token);
      const user = await usersServices.retrieveUser(username);
      const isLoggedIn = true;
      const users = await usersServices.getActiveUsersExceptRequestedID(
        user._id
      );
      const settings = await settingsServices.getAllSettings();
      const unreadMessagesCount = await messagesServices.unreadMessages();
      return res.render("admin/users/activeUsers", {
        title: `${settings[0].title} -  کاربران فعال`,
        user,
        users,
        isLoggedIn,
        settings,
        unreadMessagesCount,
      });
    } catch (err) {
      util.setError(err, {}, 400);
      util.send(res);
    }
  }

  static async getDeactiveUsers(req, res, next) {
    try {
      const username = await jwtServices.retrieveUser(req.cookies.token);
      const user = await usersServices.retrieveUser(username);
      const isLoggedIn = true;
      const users = await usersServices.getDeactiveUsersExceptRequestedID(
        user._id
      );
      const settings = await settingsServices.getAllSettings();
      const unreadMessagesCount = await messagesServices.unreadMessages();
      return res.render("admin/users/deactiveUsers", {
        title: `${settings[0].title} -  کاربران غیر فعال`,
        user,
        users,
        isLoggedIn,
        settings,
        unreadMessagesCount,
      });
    } catch (err) {
      util.setError(err, {}, 400);
      util.send(res);
    }
  }

  static async getUserById(req, res, next) {
    try {
      const { id } = req.body;
      const user = await usersServices.findUserById(id);
      if (!user) {
        util.setError({}, "User not found", 404);
        util.send(res);
      }
      return res.json({ message: "User retrieve successfully", user });
    } catch (err) {
      util.setError(err, {}, 400);
      util.send(res);
    }
  }

  static async updateRole(req, res, next) {
    try {
      const { id, role } = req.body;
      const user = await usersServices.findUserById(id);
      console.log(user);
      if (!user) {
        util.setError({}, "User not found", 404);
        util.send(res);
      }
      await usersServices.updateRole(id, role);
      util.setSuccess(`User's role updated successfully`, 200);
      util.send(res);
    } catch (err) {
      util.setError(err, {}, 400);
      util.send(res);
    }
  }

  static async updateStatus(req, res, next) {
    try {
      const { id, status } = req.body;
      const user = await usersServices.findUserById(id);
      if (!user) {
        util.setError({}, "User not found", 404);
        util.send(res);
      }
      await usersServices.updateStatus(id, status);
      util.setSuccess("User status updated successfully", 200);
      util.send(res);
    } catch (err) {
      util.setError(err, {}, 400);
      util.send(res);
    }
  }

  static async resetPassword(req, res, next) {
    try {
      const { id } = req.body;
      const user = await usersServices.findUserById(id);
      if (!user) {
        util.setError({}, "User not found", 404);
        util.send(res);
      }
      const resetPasswordToken = UniqueStringGenerator.UniqueString();
      await authServices.saveResetPasswordToken(
        user._id,
        user.username,
        resetPasswordToken
      );
      const url = `${req.headers.referer}/${resetPasswordToken}`;
      await mailerServices.userResetPasswordSendMail(
        "ارسال لینک بازیابی کلمه عبور توسط مدیر",
        user.email,
        url
      );
      return res
        .status(200)
        .json({ message: "Email sent to user", email: user.email });
    } catch (err) {
      console.log(err);
      util.setError(err, {}, 400);
      util.send(res);
    }
  }
};
