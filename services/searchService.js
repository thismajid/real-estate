const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
const Property = require("../models/property");
const PropertyCategory = require("../models/propertyCategory");
const PropertyStatus = require("../models/propertyStatus");

module.exports = class searchService {
  static async getStatusID(status) {
    try {
      return await PropertyStatus.findOne({ shortName: status }, { _id: 1 });
    } catch (err) {
      throw err;
    }
  }

  static async getCategoryID(category) {
    try {
      return await PropertyCategory.findOne(
        { shortName: category },
        { _id: 1 }
      );
    } catch (err) {
      throw err;
    }
  }

  // static async search(
  //   title,
  //   city,
  //   status,
  //   category,
  //   bedroom,
  //   lowerPrice,
  //   highPrice
  // ) {
  //   try {
  //     if (!status && !category) {
  //       return await Property.find({
  //         $and: [
  //           { city: city },
  //           { title: title },
  //           { bedroom: bedroom },
  //           {
  //             $and: [
  //               { price: { $gte: lowerPrice } },
  //               { price: { $lte: highPrice } },
  //             ],
  //           },
  //         ],
  //       })
  //         .populate("status")
  //         .populate("category")
  //         .exec();
  //     }
  //     if (status && !category) {
  //       return await Property.find({
  //         $and: [{ title: title }, { city: city }, { status: status._id }],
  //       })
  //         .populate("status")
  //         .populate("category")
  //         .exec();
  //     }
  //     if (category && !status) {
  //       return await Property.find({
  //         $and: [{ title: title }, { city: city }, { category: category._id }],
  //       })
  //         .populate("status")
  //         .populate("category")
  //         .exec();
  //     }
  //     if (category && status) {
  //       return await Property.find({
  //         $and: [
  //           { title: title },
  //           { city: city },
  //           {
  //             status: status._id,
  //           },
  //           { category: category._id },
  //         ],
  //       })
  //         .populate("status")
  //         .populate("category")
  //         .exec();
  //     }
  //   } catch (err) {
  //     throw err;
  //   }
  // }

  static async getQuery(
    title,
    city,
    lowerPrice,
    highPrice,
    status,
    category,
    bedroom
  ) {
    try {
      let query = {};
      if (title) {
        query.title = { $regex: new RegExp(title, "i") };
      }
      if (city) {
        query.city = { $eq: city };
      }
      if (lowerPrice && highPrice) {
        query.price = { $gte: lowerPrice, $lte: highPrice };
      }
      if (lowerPrice && !highPrice) {
        query.price = { $gte: lowerPrice };
      }
      if (!lowerPrice && highPrice) {
        query.price = { $lte: highPrice };
      }
      if (status && status !== "undefined") {
        const statusID = await this.getStatusID(status);
        console.log(statusID);
        query.status = { $eq: ObjectId(statusID._id) };
      }
      if (category && category !== "undefined") {
        const categoryID = await this.getCategoryID(category);
        query.category = { $eq: ObjectId(categoryID._id) };
      }
      if (bedroom && bedroom !== "undefined") {
        query.bedroom = { $eq: bedroom };
      }
      return query;
    } catch (err) {
      throw err;
    }
  }

  static async search(query) {
    try {
      return await Property.find(query)
        .populate("category")
        .populate("status")
        .exec();
    } catch (err) {
      throw err;
    }
  }
};
