const Category = require("../models/propertyCategory");
const Property = require("../models/property");

module.exports = class categoryService {
  static async getCategory(shortName) {
    try {
      return await Category.findOne({ shortName });
    } catch (err) {
      throw err;
    }
  }

  static async getAllPropertiesWithCategory(IDs, perPage, page, order) {
    try {
      return await Property.find({ _id: { $in: IDs } })
        .skip(perPage * page - perPage)
        .limit(perPage)
        .sort(order)
        .populate("status")
        .populate("category")
        .exec();
    } catch (err) {
      throw err;
    }
  }

  static async countAllPropertiesInCategory(IDs) {
    try {
      return await Property.find({ _id: { $in: IDs } })
        .count()
        .exec();
    } catch (err) {
      throw err;
    }
  }

  static async allCategories() {
    try {
      return await Category.find();
    } catch (err) {
      throw err;
    }
  }
};
