const Util = require("../utils/util");

const usersServices = require("../services/usersService");
const jwtServices = require("../services/jwtService");
const settingsServices = require("../services/settingsService");
const messagesServices = require("../services/messagesService");

const util = new Util();

module.exports = class usersController {
  static async profilePage(req, res, next) {
    try {
      const username = await jwtServices.retrieveUser(req.cookies.token);
      const user = await usersServices.retrieveUser(username);
      const settings = await settingsServices.getAllSettings();
      const unreadMessagesCount = await messagesServices.unreadMessages();
      res.render("users/profile", {
        title: `${settings[0].title} - پروفایل`,
        user,
        isLoggedIn: true,
        settings,
        unreadMessagesCount,
      });
    } catch (err) {
      util.setError(err, {}, 400);
      return util.send(res);
    }
  }

  static async profileEdit(req, res, next) {
    try {
      let { username, firstName, lastName, mobileNumber } = req.body;
      let user = await usersServices.retrieveUser(username);
      if (!user) {
        util.setError({}, "User not found", 404);
        return util.send(res);
      }
      mobileNumber = mobileNumber === "" ? null : mobileNumber;
      if (
        user.firstName !== firstName ||
        user.lastName !== lastName ||
        user.mobileNumber !== mobileNumber
      ) {
        await usersServices.updateUser(user._id, req.body);
        util.setSuccess("User information updated successfully", 200);
        return util.send(res);
      } else {
        util.setSuccess("User information is not changed", 200);
        return util.send(res);
      }
    } catch (err) {
      console.log(err);
      util.setError(err, {}, 400);
      return util.send(res);
    }
  }

  static async resetPasswordPage(req, res, next) {
    try {
      const username = await jwtServices.retrieveUser(req.cookies.token);
      const user = await usersServices.retrieveUser(username);
      let isLoggedIn = true;
      const settings = await settingsServices.getAllSettings();
      const unreadMessagesCount = await messagesServices.unreadMessages();
      res.render("users/reset-password", {
        title: `${settings[0].title} - تغییر رمز عبور`,
        user,
        isLoggedIn,
        settings,
        unreadMessagesCount,
      });
    } catch (err) {
      util.setError(err, {}, 400);
      return util.send(res);
    }
  }

  static async resetPassword(req, res, next) {
    try {
      const { id, password } = req.body;
      const user = await usersServices.findUserById(id);
      if (!user) {
        util.setError({}, "User not found", 404);
        return util.send(res);
      }
      await usersServices.updateUserPassword(id, password);
      util.setSuccess(`User's password updated successfully`, 200);
      return util.send(res);
    } catch (err) {
      util.setError(err, {}, 400);
      return util.send(res);
    }
  }

  static async avatarPage(req, res, next) {
    try {
      const username = await jwtServices.retrieveUser(req.cookies.token);
      const user = await usersServices.retrieveUser(username);
      let isLoggedIn = true;
      const settings = await settingsServices.getAllSettings();
      const unreadMessagesCount = await messagesServices.unreadMessages();
      return res.render("users/avatar", {
        title: "مشاور املاک - ویرایش عکس حساب کاربری",
        user,
        isLoggedIn,
        settings,
        unreadMessagesCount,
      });
    } catch (err) {
      util.setError(err, {}, 400);
      return util.send(res);
    }
  }

  static async changeAvatar(req, res, next) {
    try {
      const { id } = req.body;
      if (req.file) {
        await usersServices.changeAvatar(id, req.file.filename);
        return res.json({
          message: "User avatar has been changed",
          status: 200,
        });
      } else {
        util.setError({}, "Upload failed", 400);
        return util.send(res);
      }
    } catch (err) {
      util.setError(err, {}, 400);
      return util.send(res);
    }
  }
};
