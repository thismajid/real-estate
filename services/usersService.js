const User = require("../models/user");

module.exports = class usersService {
  static async retrieveUser(username) {
    try {
      return await User.findOne({ username }).select("+password");
    } catch (err) {
      throw err;
    }
  }

  static async updateUser(id, body) {
    try {
      await User.findByIdAndUpdate(id, body, { new: true });
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  static async findUserById(id) {
    try {
      return await User.findOne({ _id: id });
    } catch (err) {
      throw err;
    }
  }

  static async updateUserPassword(id, password) {
    try {
      return await User.findOneAndUpdate(
        { _id: id },
        {
          $set: { password: password },
        }
      );
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  static async findUserById(id) {
    try {
      return await User.findOne({ _id: id });
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  static async updateRole(id, role) {
    try {
      return await User.findByIdAndUpdate(id, { role: role }, { new: true });
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  static async getAllUsersExceptRequestedID(requestedID) {
    try {
      return await User.find({ _id: { $ne: requestedID } });
    } catch (err) {
      throw err;
    }
  }

  static async getActiveUsersExceptRequestedID(requestedID) {
    try {
      return await User.find({
        $and: [{ _id: { $ne: requestedID } }, { status: { $eq: "active" } }],
      });
    } catch (err) {
      throw err;
    }
  }

  static async getDeactiveUsersExceptRequestedID(requestedID) {
    try {
      return await User.find({
        $and: [{ _id: { $ne: requestedID } }, { status: { $eq: "deactive" } }],
      });
    } catch (err) {
      throw err;
    }
  }

  static async updateStatus(id, updateStatus) {
    try {
      return await User.findByIdAndUpdate(
        id,
        { $set: { status: updateStatus } },
        { new: true }
      );
    } catch (err) {
      throw err;
    }
  }

  static async changeAvatar(id, avatar) {
    try {
      return await User.findByIdAndUpdate(
        id,
        {
          avatar: `/images/uploads/avatars/user/${avatar}`,
        },
        { new: true }
      );
    } catch (err) {
      throw err;
    }
  }
};
