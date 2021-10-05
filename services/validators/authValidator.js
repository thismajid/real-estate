const Ajv = require("ajv").default;
const Util = require("../../utils/util");

const ajv = new Ajv({ allErrors: true });

const util = new Util();

module.exports = class authValidator {
  static async register(req, res, next) {
    try {
      const schema = {
        type: "object",
        properties: {
          firstName: { type: "string", minLength: 3, maxLength: 30 },
          lastName: { type: "string", minLength: 3, maxLength: 30 },
          username: { type: "string", minLength: 4, maxLength: 30 },
          email: {
            type: "string",
            pattern: "^[a-zA-Z0-9.]+@[a-zA-Z0-9.]+.[a-zA-Z]{2,4}",
          },
          mobileNumber: {
            type: "string",
            minLength: 11,
          },
          password: {
            type: "string",
            pattern:
              "^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})",
          },
        },
        required: [
          "firstName",
          "lastName",
          "username",
          "email",
          "mobileNumber",
          "password",
        ],
        additionalProperties: true,
      };

      const validate = ajv.compile(schema);
      const valid = validate(req.body);
      if (!valid) {
        let msg;
        validate.errors.forEach(async (err) => {
          msg += `${err.instancePath} ${err.message}`;
        });
        req.flash("validationError", msg);
        return res.redirect("/auth/register");
      }
      next();
    } catch (err) {
      console.log(err);
      util.setError(err, {}, 400);
      return util.send(res);
    }
  }

  static async login(req, res, next) {
    try {
      const schema = {
        type: "object",
        properties: {
          username: { type: "string", minLength: 4, maxLength: 30 },
          password: {
            type: "string",
            minLength: 6,
          },
        },
        required: ["username", "password"],
        additionalProperties: true,
      };

      const validate = ajv.compile(schema);
      const valid = validate(req.body);
      if (!valid) {
        let msg;
        validate.errors.forEach(async (err) => {
          msg += `${err.instancePath} ${err.message}`;
        });
        req.flash("validationError", msg);
        return res.redirect("/auth/login");
      }
      next();
    } catch (err) {
      util.setError(err, {}, 400);
      return util.send(res);
    }
  }
};
