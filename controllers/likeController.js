const Util = require("../utils/util");

const likeServices = require("../services/likeService");

const util = new Util();

module.exports = class likeController {
  static async submit(req, res, next) {
    try {
      const { propertyID, userID } = req.body;
      await likeServices.submit(userID, propertyID);
      util.setSuccess("Like for this property submited successfully", 200);
      return util.send(res);
    } catch (err) {
      util.setError(err, {}, 400);
      util.send(res);
    }
  }

  static async remove(req, res, next) {
    try {
      const { propertyID, userID } = req.body;
      await likeServices.remove(userID, propertyID);
      util.setSuccess("Like removed for this property successfully", 200);
      return util.send(res);
    } catch (err) {
      util.setError(err, {}, 400);
      util.send(res);
    }
  }
};
