const User = require("../models/user");

module.exports = class adminService {
  static async getAllUsers(req, res, next) {
    try {
      return await User.find({});
    } catch (err) {
      throw err;
    }
  }
};
