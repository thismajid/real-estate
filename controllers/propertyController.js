const Util = require("../utils/util");

const propertyServices = require("../services/propertyService");
const jwtServices = require("../services/jwtService");
const usersServices = require("../services/usersService");
const settingsServices = require("../services/settingsService");
const propertyManagementServices = require("../services/propertyManagementService");
const messagesServices = require("../services/messagesService");

const util = new Util();

module.exports = class propertyController {
  static async getSingleProperty(req, res, next) {
    try {
      const token = req && req.cookies.token ? req.cookies.token : null;
      let user;
      let isLoggedIn = false;
      if (token) {
        const username = await jwtServices.retrieveUser(token);
        user = await usersServices.retrieveUser(username);
      }
      if (user) {
        isLoggedIn = Object.values(user).length > 0 ? true : false;
      }
      const { id } = req.params;
      const property = await propertyServices.getSingleProperty(id);
      if (!property) {
        util.setError({}, "Property not found", 400);
        return util.send(res);
      }
      const facilities = await propertyServices.getAllFacilities();
      const latestProperty = await propertyServices.latestProperty();
      const categories = await propertyServices.getAllCategories();
      const settings = await settingsServices.getAllSettings();
      const unreadMessagesCount = await messagesServices.unreadMessages();
      const propertyStatus =
        await propertyManagementServices.getAllPropertyStatus();
      const propertyCategories =
        await propertyManagementServices.getAllPropertyCategories();
      return res.render("property/property-single", {
        title: `${settings[0].title} - ${property.title}`,
        user,
        isLoggedIn,
        property,
        facilities,
        categories,
        latestProperty,
        settings,
        unreadMessagesCount,
        propertyStatus,
        propertyCategories,
      });
    } catch (err) {
      console.log(err);
      util.setError(err, {}, 400);
      util.send(res);
    }
  }

  static async getSubmitPropertyPage(req, res) {
    try {
      const token = req && req.cookies.token ? req.cookies.token : null;
      let user;
      let isLoggedIn = false;
      if (token) {
        const username = await jwtServices.retrieveUser(token);
        user = await usersServices.retrieveUser(username);
      }
      if (user) {
        isLoggedIn = Object.values(user).length > 0 ? true : false;
      }
      const propertyStatus =
        await propertyManagementServices.getAllPropertyStatus();
      const propertyCategories =
        await propertyManagementServices.getAllPropertyCategories();
      console.log(propertyCategories);
      const propertyFacilities =
        await propertyManagementServices.getAllPropertyFacilities();
      const settings = await settingsServices.getAllSettings();
      const unreadMessagesCount = await messagesServices.unreadMessages();
      return res.render("property/submit", {
        title: `${settings[0].title} - ارسال ملک`,
        user,
        isLoggedIn,
        propertyStatus,
        propertyCategories,
        propertyFacilities,
        settings,
        unreadMessagesCount,
      });
    } catch (err) {
      util.setError(err, {}, 400);
      util.send(res);
    }
  }

  static async submitProperty(req, res) {
    try {
      const {
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
        constructionYear,
        status,
        category,
      } = req.body;
      const facilities = req.body.facilityIDs.split("-").filter((i) => i);
      const propertyFound =
        await propertyManagementServices.checkTitleDuplication(title);
      if (propertyFound) {
        util.setError({}, `Property with this title: ${title} has exist`, 404);
        return util.send(res);
      }
      const isPending = "true";
      const property = await propertyManagementServices.submitProperty(
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
        `/images/uploads/properties/${req.files.mainPicture[0].filename}`,
        isPending
      );
      await propertyManagementServices.addOtherPicturesProperty(
        property._id,
        req.files.otherPictures
      );
      await propertyManagementServices.submitPropertyIDinPropertyStatus(
        property._id,
        status
      );
      await propertyManagementServices.submitPropertyCategory(
        property._id,
        category
      );
      await propertyManagementServices.submitPropertyFacilities(
        property._id,
        facilities
      );
      util.setSuccess("Property submit successfully", 200);
      util.send(res);
    } catch (err) {
      util.setError(err, {}, 400);
      util.send(res);
    }
  }
};
