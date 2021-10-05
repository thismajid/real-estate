const User = require("../models/user");
const Reset = require("../models/resetPassword");
const bcrypt = require("bcryptjs");

module.exports = class authService {
  static async checkUsername(username) {
    try {
      return await User.findOne({ username });
    } catch (err) {
      throw err;
    }
  }

  static async checkEmail(email) {
    try {
      return await User.findOne({ email });
    } catch (err) {
      throw err;
    }
  }

  static async checkMobileNumberDuplication(mobileNumber) {
    try {
      return await User.findOne({ mobileNumber });
    } catch (err) {
      throw err;
    }
  }

  static async saveUser(body) {
    try {
      const newUser = new User({
        firstName: body.firstName,
        lastName: body.lastName,
        username: body.username,
        email: body.email,
        mobileNumber: body.mobileNumber,
        password: body.password,
        role: "user",
      });
      return await newUser.save();
    } catch (err) {
      throw err;
    }
  }

  static async findUserWithPassword(username) {
    try {
      return await User.findOne({ username }).select("+password");
    } catch (err) {
      throw err;
    }
  }

  static async comparePassword(reqPassword, userPassword) {
    try {
      return await bcrypt.compare(reqPassword, userPassword);
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

  static async findUserWithUsernameOrEmail(username, email) {
    try {
      return await User.findOne({ $or: [{ username }, { email }] });
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  static async saveResetPasswordToken(id, username, token) {
    try {
      const resetPasswordToken = new Reset({
        username: username,
        userID: id,
        token,
      });
      return await resetPasswordToken.save();
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  static async checkTokenValidation(token) {
    try {
      return await Reset.findOne({ token: token });
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  static async changeTokenUsedStatus(token) {
    try {
      return await Reset.findOneAndUpdate(
        { token: token },
        { isUsed: true },
        { new: true }
      );
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
};
