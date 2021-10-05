const Util = require("../utils/util");
const UniqueStringGenerator = require("unique-string-generator");

const authServices = require("../services/authService");
const jwtServices = require("../services/jwtService");
const mailerServices = require("../services/mailerService");
const settingsServices = require("../services/settingsService");

const util = new Util();

module.exports = class authController {
  static async registerPage(req, res, next) {
    try {
      const settings = await settingsServices.getAllSettings();
      return res.render("auth/register", {
        title: `${settings[0].title} - ثبت نام`,
        user: {},
        isLoggedIn: false,
        errors: req.flash("validationError"),
        settings,
      });
    } catch (err) {
      util.setError(err, {}, 400);
      return util.send(res);
    }
  }

  static async register(req, res, next) {
    try {
      const { username, email, mobileNumber } = req.body;
      const usernameFound = await authServices.checkUsername(username);
      if (usernameFound) {
        util.setError({}, "duplicate username", 400);
        return util.send(res);
      }

      const emailFound = await authServices.checkEmail(email);
      if (emailFound) {
        util.setError({}, "duplicate email", 400);
        return util.send(res);
      }
      const mobileNumberFound = await authServices.checkMobileNumberDuplication(
        mobileNumber
      );
      if (mobileNumberFound) {
        util.setError({}, "duplicate mobile number", 400);
        return util.send(res);
      }
      await authServices.saveUser(req.body);
      util.setSuccess("User has been created successfully", 200);
      return util.send(res);
    } catch (err) {
      util.setError(err, {}, 400);
      return util.send(res);
    }
  }

  static async loginPage(req, res, next) {
    try {
      const settings = await settingsServices.getAllSettings();
      return res.render("auth/login", {
        title: `${settings[0].title} - ورود`,
        user: {},
        isLoggedIn: false,
        settings,
      });
    } catch (err) {
      util.setError(err, {}, 400);
      return util.send(res);
    }
  }

  static async login(req, res, next) {
    try {
      const { username, password, rememberMe } = req.body;
      const userFound = await authServices.findUserWithPassword(username);
      if (!userFound) {
        util.setError({}, "User not found", 404);
        return util.send(res);
      }
      const match = await authServices.comparePassword(
        password,
        userFound.password
      );
      if (!match) {
        util.setError({}, "Password is not match", 400);
        return util.send(res);
      }
      const token = await jwtServices.createToken(userFound, rememberMe);
      res.cookie("token", token);
      util.setSuccess("Login successfully", 200);
      return util.send(res);
    } catch (err) {
      util.setError(err, {}, 400);
      return util.send(res);
    }
  }

  static async googleAuth(req, res, next) {
    try {
      res.cookie("token", req.user.token);
      util.setSuccess("Login successfully", 200);
      return res.redirect("/");
    } catch (err) {
      util.setError(err, {}, 400);
      return util.send(res);
    }
  }

  static async resetPasswordMainPage(req, res, next) {
    try {
      const settings = await settingsServices.getAllSettings();
      return res.render("auth/reset-password-request", {
        title: `${settings[0].title} - بازیابی کلمه عبور`,
        user: {},
        isLoggedIn: false,
        settings,
      });
    } catch (err) {
      util.setError(err, {}, 400);
      return util.send(res);
    }
  }

  static async resetPasswordRequest(req, res, next) {
    try {
      const { username, email } = req.body;
      if (username || email) {
        const user = await authServices.findUserWithUsernameOrEmail(
          username,
          email
        );
        if (!user) {
          util.setError({}, "User is not found", 404);
          return util.send(res);
        }
        const resetPasswordToken = UniqueStringGenerator.UniqueString();
        await authServices.saveResetPasswordToken(
          user._id,
          user.username,
          resetPasswordToken
        );
        const url = `${req.headers.referer}/${resetPasswordToken}`;
        await mailerServices.userResetPasswordSendMail(
          "درخواست بازیابی کلمه عبور",
          user.email,
          url
        );
        return res
          .status(200)
          .json({ message: "Email sent to user", email: user.email });
      }
      util.setError({}, "Your request have not body", 400);
      return util.send(res);
    } catch (err) {
      util.setError(err, {}, 400);
      return util.send(res);
    }
  }

  static async resetPasswordPage(req, res, next) {
    try {
      const { token } = req.params;
      const tokenValidation = await authServices.checkTokenValidation(token);
      if (!tokenValidation || tokenValidation.isUsed === true) {
        res.redirect("/auth/reset");
      }
      const settings = await settingsServices.getAllSettings();
      return res.render("auth/reset-password-page", {
        title: `${settings[0].title} - بازیابی کلمه عبور`,
        user: {},
        isLoggedIn: false,
        token: req.params.token,
        settings,
      });
    } catch (err) {
      util.setError(err, {}, 400);
      return util.send(res);
    }
  }

  static async resetPassword(req, res, next) {
    try {
      const { password, token } = req.body;
      const tokenValidation = await authServices.checkTokenValidation(token);
      if (!tokenValidation || tokenValidation.isUsed === true) {
        util.setError({}, "Token invalid", 404);
        return util.send(res);
      }
      const user = await authServices.findUserWithUsernameOrEmail(
        tokenValidation.username,
        ""
      );
      if (!user) {
        util.setError({}, "User not found", 404);
        return util.send(res);
      }
      await authServices.updateUserPassword(tokenValidation.userID, password);
      await authServices.changeTokenUsedStatus(token);
      util.setSuccess("Password changed successfully", 200);
      return util.send(res);
    } catch (err) {
      util.setError(err, {}, 400);
      return util.send(res);
    }
  }

  static async logout(req, res, next) {
    try {
      res.cookie("token", "");
      return res.redirect("/");
    } catch (err) {
      util.setError(err, {}, 400);
      return util.send(res);
    }
  }
};
