const Property = require("../models/property");
const PropertyFacility = require("../models/propertyFacility");
const PropertyCategory = require("../models/propertyCategory");

module.exports = class propertService {
  static async getLatestProperties() {
    try {
      return await Property.find({ isPending: "false" })
        .sort({ createdAt: "-1" })
        .limit(3)
        .populate("status")
        .populate("category")
        .exec();
    } catch (err) {
      throw err;
    }
  }
  static async getSingleProperty(id) {
    try {
      return await Property.findOne({ propertyID: id });
    } catch (err) {
      throw err;
    }
  }

  static async getAllFacilities() {
    try {
      return PropertyFacility.find({});
    } catch (err) {
      throw err;
    }
  }

  static async latestProperty() {
    try {
      return Property.find().sort({ createdAt: -1 }).limit(2);
    } catch (err) {
      throw err;
    }
  }

  static async getAllCategories() {
    try {
      return await PropertyCategory.find();
    } catch (err) {
      throw err;
    }
  }

  static async middleSectionProperties(status) {
    try {
      return await Property.find({ status: status, isPending: "false" })
        .populate("status")
        .populate("category")
        .limit(3)
        .sort({ createdAt: -1 })
        .exec();
    } catch (err) {
      throw err;
    }
  }
};
