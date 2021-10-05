const Property = require("../models/property");

module.exports = class likeService {
  static async submit(user, property) {
    try {
      return await Property.findByIdAndUpdate(property, {
        $push: { likes: user },
      });
    } catch (err) {
      throw err;
    }
  }

  static async remove(user, property) {
    try {
      return await Property.findByIdAndUpdate(property, {
        $pull: { likes: user },
      });
    } catch (err) {
      throw err;
    }
  }

  static async getAllLikes() {
    try {
      return await PropertyLike.find();
    } catch (err) {
      throw err;
    }
  }
};
