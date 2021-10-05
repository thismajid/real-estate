const Property = require("../models/property");
const PropertyStatus = require("../models/propertyStatus");
const PropertyCategory = require("../models/propertyCategory");
const PropertyFacility = require("../models/propertyFacility");
const randomstring = require("randomstring");
const fs = require("fs");
const path = require("path");

module.exports = class propertyService {
  static async getAllPropertyStatus() {
    try {
      return await PropertyStatus.find();
    } catch (err) {
      throw err;
    }
  }

  static async submitPropertyStatus(name, description) {
    try {
      const shortName = randomstring.generate(5);
      return await new PropertyStatus({
        name,
        shortName,
        description,
      }).save();
    } catch (err) {
      throw err;
    }
  }

  static async getSinglePropertyStatus(id) {
    try {
      return await PropertyStatus.findById(id);
    } catch (err) {
      throw err;
    }
  }

  static async editPropertyStatus(id, name, description) {
    try {
      return await PropertyStatus.findByIdAndUpdate(
        id,
        { name, description },
        { new: true }
      );
    } catch (err) {
      throw err;
    }
  }

  static async deletePropertyStatus(id) {
    try {
      return await PropertyStatus.findByIdAndDelete(id);
    } catch (err) {
      throw err;
    }
  }

  static async getAllPropertyCategories() {
    try {
      return await PropertyCategory.find();
    } catch (err) {
      throw err;
    }
  }

  static async submitPropertyCategories(name, description) {
    try {
      const shortName = randomstring.generate(5);
      return await new PropertyCategory({
        name,
        shortName,
        description,
      }).save();
    } catch (err) {
      throw err;
    }
  }

  static async getSinglePropertyCategory(id) {
    try {
      return await PropertyCategory.findById(id);
    } catch (err) {
      throw err;
    }
  }

  static async editPropertyCategory(id, name, description) {
    try {
      return await PropertyCategory.findByIdAndUpdate(
        id,
        { name, description },
        { new: true }
      );
    } catch (err) {
      throw err;
    }
  }

  static async deletePropertyCategory(id) {
    try {
      return await PropertyCategory.findByIdAndDelete(id);
    } catch (err) {
      throw err;
    }
  }

  static async getAllPropertyFacilities() {
    try {
      return await PropertyFacility.find();
    } catch (err) {
      throw err;
    }
  }

  static async submitPropertyFacility(name, description) {
    try {
      const shortName = randomstring.generate(5);
      return await new PropertyFacility({
        name,
        shortName,
        description,
      }).save();
    } catch (err) {
      throw err;
    }
  }

  static async getSinglePropertyFacility(id) {
    try {
      return await PropertyFacility.findById(id);
    } catch (err) {
      throw err;
    }
  }

  static async editPropertyFacility(id, name, description) {
    try {
      return await PropertyFacility.findByIdAndUpdate(
        id,
        { name, description },
        { new: true }
      );
    } catch (err) {
      throw err;
    }
  }

  static async deletePropertyFacility(id) {
    try {
      return await PropertyFacility.findByIdAndDelete(id);
    } catch (err) {
      throw err;
    }
  }

  static async checkTitleDuplication(title) {
    try {
      return await PropertyFacility.findOne({ title });
    } catch (err) {
      throw err;
    }
  }

  static async submitProperty(
    title,
    description,
    price,
    area,
    bedroom,
    bathroom,
    parking,
    city,
    region,
    address,
    status,
    category,
    constructionYear,
    mainPicture,
    isPending
  ) {
    try {
      const propertyID = randomstring.generate(7);
      return await new Property({
        title,
        description,
        price,
        area,
        bedroom,
        bathroom,
        parking,
        city,
        region,
        address,
        status,
        category,
        constructionYear,
        propertyID,
        mainPicture,
        isPending,
      }).save();
    } catch (err) {
      throw err;
    }
  }

  static async addOtherPicturesProperty(id, otherPictures) {
    try {
      await otherPictures.forEach(async (pic) => {
        await Property.findByIdAndUpdate(id, {
          $push: {
            otherPictures: `/images/uploads/properties/${pic.filename}`,
          },
        });
      });
    } catch (err) {
      throw err;
    }
  }

  static async submitPropertyFacilities(id, facilities) {
    try {
      await facilities.forEach(async (facility) => {
        await PropertyFacility.findByIdAndUpdate(facility, {
          $push: { propertyID: id },
        });
      });
    } catch (err) {
      throw err;
    }
  }

  static async submitPropertyIDinPropertyStatus(propertyID, statusID) {
    try {
      await PropertyStatus.findByIdAndUpdate(statusID, {
        $push: { propertyID: propertyID },
      });
    } catch (err) {
      throw err;
    }
  }

  static async submitPropertyCategory(propertyID, categoryID) {
    try {
      await PropertyCategory.findByIdAndUpdate(categoryID, {
        $push: { propertyID: propertyID },
      });
    } catch (err) {
      throw err;
    }
  }

  static async getAllProperties() {
    try {
      return await Property.find({ isPending: "false" })
        .sort({ createdAt: -1 })
        .populate("status")
        .populate("category")
        .exec();
    } catch (err) {
      throw err;
    }
  }

  static async getAllDeletedProperties() {
    try {
      return await Property.find()
        .sort({ createdAt: -1 })
        .populate("status")
        .populate("category")
        .exec();
    } catch (err) {
      throw err;
    }
  }

  static async getPropertyByPropertyID(id) {
    try {
      return await Property.findOne({ propertyID: id })
        .populate("status")
        .populate("category")
        .exec();
    } catch (err) {
      throw err;
    }
  }

  static async getPropertyByID(id) {
    try {
      return await Property.findById(id);
    } catch (err) {
      throw err;
    }
  }

  static async editProperty(
    id,
    title,
    status,
    description,
    category,
    constructionYear,
    price,
    area,
    bedroom,
    bathroom,
    parking,
    city,
    region,
    address
  ) {
    try {
      return await Property.findByIdAndUpdate(id, {
        title,
        status,
        description,
        category,
        constructionYear,
        price,
        area,
        bedroom,
        bathroom,
        parking,
        city,
        region,
        address,
      });
    } catch (err) {
      throw err;
    }
  }

  static async removeOldMainPicture(id, mainPicture) {
    try {
      return await fs.unlinkSync(
        path.join(__dirname, `../public/${mainPicture}`)
      );
    } catch (err) {
      throw err;
    }
  }

  static async editMainPicture(id, mainPicture) {
    try {
      return await Property.findByIdAndUpdate(
        id,
        {
          mainPicture,
        },
        { new: true }
      );
    } catch (err) {
      throw err;
    }
  }

  static async removeOtherPicturesDB(id, removedPictures) {
    try {
      if (removedPictures.length > 0) {
        await removedPictures.forEach(async (pic) => {
          return await Property.findByIdAndUpdate(
            id,
            {
              $pull: {
                otherPictures: pic,
              },
            },
            { new: true }
          );
        });
      }
    } catch (err) {
      throw err;
    }
  }

  static async removePicturesFromHost(removedPictures) {
    try {
      if (removedPictures.length > 0) {
        await removedPictures.forEach(async (pic) => {
          await fs.unlinkSync(path.join(__dirname, `../public/${pic}`));
        });
      }
    } catch (err) {
      throw err;
    }
  }

  static async editOtherPictures(id, otherPictures) {
    try {
      if (otherPictures.length > 0) {
        await otherPictures.forEach(async (pic) => {
          return await Property.findByIdAndUpdate(
            id,
            {
              $push: {
                otherPictures: `/images/uploads/properties/${pic.filename}`,
              },
            },
            { new: true }
          );
        });
      }
    } catch (err) {
      throw err;
    }
  }

  static async removePropertyIDinFormerPropertyStatus(statusID, propertyID) {
    try {
      return await PropertyStatus.findByIdAndUpdate(statusID, {
        $pull: { propertyID: propertyID },
      });
    } catch (err) {
      throw err;
    }
  }

  static async addPropertyIDinPropertyStatus(statusID, propertyID) {
    try {
      return await PropertyStatus.findByIdAndUpdate(statusID, {
        $push: { propertyID: propertyID },
      });
    } catch (err) {
      throw err;
    }
  }

  static async removePropertyIDinFormerPropertyCategory(
    categoryID,
    propertyID
  ) {
    try {
      return await PropertyCategory.findByIdAndUpdate(categoryID, {
        $pull: { propertyID: propertyID },
      });
    } catch (err) {
      throw err;
    }
  }

  static async addPropertyIDinPropertyCategory(categoryID, propertyID) {
    try {
      return await PropertyCategory.findByIdAndUpdate(categoryID, {
        $push: { propertyID: propertyID },
      });
    } catch (err) {
      throw err;
    }
  }

  static async editPropertyFacilities(facilities, propertyID) {
    try {
      const equalFacilities = await PropertyFacility.find({
        _id: { $in: facilities },
      });

      const notEqualFacilities = await PropertyFacility.find({
        _id: { $nin: facilities },
      });

      equalFacilities.forEach(async (facility) => {
        if (!facility.propertyID.includes(propertyID)) {
          await PropertyFacility.findByIdAndUpdate(facility._id, {
            $push: { propertyID: propertyID },
          });
        }
      });

      notEqualFacilities.forEach(async (facility) => {
        if (facility.propertyID.includes(propertyID)) {
          await PropertyFacility.findByIdAndUpdate(facility._id, {
            $pull: { propertyID: propertyID },
          });
        }
      });
    } catch (err) {
      throw err;
    }
  }

  static async deleteProperty(id) {
    try {
      const property = await Property.findById(id);
      await fs.unlinkSync(
        path.join(__dirname, `../public/${property.mainPicture}`)
      );
      await property.otherPictures.forEach(async (pic) => {
        await fs.unlinkSync(path.join(__dirname, `../public/${pic}`));
      });
      return await Property.findByIdAndDelete(id);
    } catch (err) {
      throw err;
    }
  }

  static async getAllPendingProperties() {
    try {
      return await Property.find({ isPending: "true" })
        .populate("status")
        .populate("category")
        .sort({ createdAt: -1 })
        .exec();
    } catch (err) {
      throw err;
    }
  }

  static async changePendingProperties(id) {
    try {
      return await Property.findByIdAndUpdate(
        id,
        {
          isPending: "false",
        },
        { new: true }
      );
    } catch (err) {
      throw err;
    }
  }

  static async deletePropertyFromCategoryPropertyID(categoryID, propertyID) {
    try {
      return await PropertyCategory.findByIdAndUpdate(
        categoryID,
        {
          $pull: { propertyID: propertyID },
        },
        { new: true }
      );
    } catch (err) {
      throw err;
    }
  }

  static async deletePropertyFromStatusPropertyID(statusID, propertyID) {
    try {
      return await PropertyStatus.findByIdAndUpdate(
        statusID,
        {
          $pull: { propertyID: propertyID },
        },
        { new: true }
      );
    } catch (err) {
      throw err;
    }
  }
};
