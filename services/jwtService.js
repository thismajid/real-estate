const jwt = require("jsonwebtoken");
const Util = require("../utils/util");

const util = new Util();

module.exports = class jwtService {
  static async createToken(user, rememberMe) {
    try {
      if (rememberMe) {
        return await jwt.sign(
          { username: user.username, role: user.role },
          process.env.TOKEN_SECRET,
          { expiresIn: "7d" }
        );
      } else {
        return await jwt.sign(
          { username: user.username, role: user.role },
          process.env.TOKEN_SECRET,
          { expiresIn: "24h" }
        );
      }
    } catch (err) {
      throw err;
    }
  }
  static async verifyToken(req, res, next) {
    try {
      const token = req && req.cookies.token ? req.cookies.token : null;
      if (!token) {
        return res.redirect("/");
      }
      const decoded = await jwt.verify(token, process.env.TOKEN_SECRET);
      if (decoded) {
        return next();
      }
      return res.redirect("/");
    } catch (err) {
      util.setError(err, {}, 400);
      return util.send(res);
    }
  }

  static async retrieveUser(token) {
    try {
      const decoded = await jwt.verify(token, process.env.TOKEN_SECRET);
      return decoded.username;
    } catch (err) {
      throw err;
    }
  }

  static authorize(roles) {
    return async function (req, res, next) {
      try {
        const token = req && req.cookies.token ? req.cookies.token : null;
        const decoded = await jwt.verify(token, process.env.TOKEN_SECRET);
        let isAuthurized = false;
        roles.forEach(
          (item) => (isAuthurized = isAuthurized || decoded.role === item)
        );
        if (isAuthurized) {
          return next();
        }
        return res.redirect("/");
      } catch (err) {
        return res.redirect("/");
      }
    };
  }

  static checkUserOrAdmin(roles) {
    return async function (req, res, next) {
      try {
        const token = req && req.cookies.token ? req.cookies.token : null;
        if (token) {
          const decoded = await jwt.verify(token, process.env.TOKEN_SECRET);
          let isAuthurized = false;
          roles.forEach(
            (item) => (isAuthurized = isAuthurized || decoded.role === item)
          );
          if (isAuthurized) {
            return res.redirect("/admin/properties/submit");
          } else {
            return next();
          }
        }
        return next();
      } catch (err) {
        console.log(err);
        return res.redirect("/");
      }
    };
  }
};
