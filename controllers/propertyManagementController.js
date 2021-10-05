const Util = require("../utils/util");

const jwtServices = require("../services/jwtService");
const usersServices = require("../services/usersService");
const propertyManagementServices = require("../services/propertyManagementService");
const settingsServices = require("../services/settingsService");
const messagesServices = require("../services/messagesService");
const telegramServices = require("../services/telegramService");

const util = new Util();

module.exports = class propertyController {
  static async submitPage(req, res, next) {
    try {
      const username = await jwtServices.retrieveUser(req.cookies.token);
      const user = await usersServices.retrieveUser(username);
      const propertyStatus =
        await propertyManagementServices.getAllPropertyStatus();
      const propertyCategories =
        await propertyManagementServices.getAllPropertyCategories();
      const propertyFacilities =
        await propertyManagementServices.getAllPropertyFacilities();
      const isLoggedIn = true;
      const settings = await settingsServices.getAllSettings();
      const unreadMessagesCount = await messagesServices.unreadMessages();
      res.render("admin/property/submitPage", {
        title: `${settings[0].title} - ثبت ملک`,
        user,
        isLoggedIn,
        propertyStatus,
        propertyCategories,
        propertyFacilities,
        settings,
        unreadMessagesCount,
      });
    } catch (err) {
      console.log(err);
      util.setError(err, {}, 400);
      util.send(res);
    }
  }

  static async propertyStatusPage(req, res, next) {
    try {
      const username = await jwtServices.retrieveUser(req.cookies.token);
      const user = await usersServices.retrieveUser(username);
      const propertyStatus =
        await propertyManagementServices.getAllPropertyStatus();
      const isLoggedIn = true;
      const settings = await settingsServices.getAllSettings();
      const unreadMessagesCount = await messagesServices.unreadMessages();
      res.render("admin/property/status", {
        title: `${settings[0].title} - مدیریت وضعیت املاک`,
        user,
        isLoggedIn,
        propertyStatus,
        settings,
        unreadMessagesCount,
      });
    } catch (err) {
      console.log(err);
      util.setError(err, {}, 400);
      util.send(res);
    }
  }

  static async submitPropertyStatus(req, res, next) {
    try {
      console.log(req.body);
      const { name, description } = req.body;
      await propertyManagementServices.submitPropertyStatus(name, description);
      util.setSuccess("Property status submit successfully", 200);
      res.redirect("/admin/properties/status");
    } catch (err) {
      console.log(err);
      util.setError(err, {}, 400);
      util.send(res);
    }
  }

  static async getSinglePropertyStatus(req, res, next) {
    try {
      const { id } = req.body;
      const status = await propertyManagementServices.getSinglePropertyStatus(
        id
      );
      if (!status) {
        util.setError({}, "Status does not exist", 404);
        util.send(res);
      }
      return res.json({
        message: "Property status retrieved successfully",
        status: 200,
        status,
      });
    } catch (err) {
      util.setError(err, {}, 400);
      util.send(res);
    }
  }

  static async editPropertyStatus(req, res, next) {
    try {
      console.log(req.body);
      const { id, name, description } = req.body;
      const property = await propertyManagementServices.getSinglePropertyStatus(
        id
      );
      if (!property) {
        util.setError({}, "Property does not exist", 404);
        util.send(res);
      }
      await propertyManagementServices.editPropertyStatus(
        id,
        name,
        description
      );
      util.setSuccess("Property status updated successfully", 200);
      util.send(res);
    } catch (err) {
      console.log(err);
      util.setError(err, {}, 400);
      util.send(res);
    }
  }

  static async deletePropertyStatus(req, res, next) {
    try {
      console.log(req.body);
      const { id } = req.body;
      const property = await propertyManagementServices.getSinglePropertyStatus(
        id
      );
      if (!property) {
        util.setError({}, "Property does not exist", 404);
        util.send(res);
      }
      await propertyManagementServices.deletePropertyStatus(id);
      util.setSuccess("Property status deleted successfully", 200);
      util.send(res);
    } catch (err) {
      console.log(err);
      util.setError(err, {}, 400);
      util.send(res);
    }
  }

  static async propertyCategoriesPage(req, res, next) {
    try {
      const username = await jwtServices.retrieveUser(req.cookies.token);
      const user = await usersServices.retrieveUser(username);
      const propertyCategories =
        await propertyManagementServices.getAllPropertyCategories();
      const isLoggedIn = true;
      const settings = await settingsServices.getAllSettings();
      const unreadMessagesCount = await messagesServices.unreadMessages();
      res.render("admin/property/categories", {
        title: `${settings[0].title} - مدیریت دسته بندی املاک`,
        user,
        isLoggedIn,
        propertyCategories,
        settings,
        unreadMessagesCount,
      });
    } catch (err) {
      util.setError(err, {}, 400);
      util.send(res);
    }
  }

  static async submitPropertyCategories(req, res, next) {
    try {
      console.log(req.body);
      const { name, description } = req.body;
      await propertyManagementServices.submitPropertyCategories(
        name,
        description
      );
      util.setSuccess("Property category submit successfully", 200);
      res.redirect("/admin/properties/categories");
    } catch (err) {
      console.log(err);
      util.setError(err, {}, 400);
      util.send(res);
    }
  }

  static async editPropertyCategory(req, res, next) {
    try {
      const { id, name, description } = req.body;
      const Category =
        await propertyManagementServices.getSinglePropertyCategory(id);
      if (!Category) {
        util.setError({}, "Property category does not exist", 404);
        util.send(res);
      }
      await propertyManagementServices.editPropertyCategory(
        id,
        name,
        description
      );
      util.setSuccess("Property category updated successfully", 200);
      util.send(res);
    } catch (err) {
      util.setError(err, {}, 400);
      util.send(res);
    }
  }

  static async deletePropertyCategory(req, res, next) {
    try {
      const { id } = req.body;
      const Category =
        await propertyManagementServices.getSinglePropertyCategory(id);
      if (!Category) {
        util.setError({}, "Property category does not exist", 404);
        util.send(res);
      }
      await propertyManagementServices.deletePropertyCategory(id);
      util.setSuccess("Property category deleted successfully", 200);
      util.send(res);
    } catch (err) {
      util.setError(err, {}, 400);
      util.send(res);
    }
  }

  static async getSinglePropertyCategory(req, res, next) {
    try {
      const { id } = req.body;
      const Category =
        await propertyManagementServices.getSinglePropertyCategory(id);
      if (!Category) {
        util.setError({}, "Category does not exist", 404);
        return util.send(res);
      }
      return res.json({
        message: "Property Category retrieved successfully",
        status: 200,
        Category,
      });
    } catch (err) {
      util.setError(err, {}, 400);
      util.send(res);
    }
  }

  static async propertyFacilitiesPage(req, res, next) {
    try {
      const username = await jwtServices.retrieveUser(req.cookies.token);
      const user = await usersServices.retrieveUser(username);
      const propertyFacility =
        await propertyManagementServices.getAllPropertyFacilities();
      const isLoggedIn = true;
      const settings = await settingsServices.getAllSettings();
      const unreadMessagesCount = await messagesServices.unreadMessages();
      res.render("admin/property/facilities", {
        title: `${settings[0].title} - مدیریت امکانات املاک`,
        user,
        isLoggedIn,
        propertyFacility,
        settings,
        unreadMessagesCount,
      });
    } catch (err) {
      console.log(err);
      util.setError(err, {}, 400);
      util.send(res);
    }
  }

  static async submitPropertyFacility(req, res, next) {
    try {
      const { name, description } = req.body;
      await propertyManagementServices.submitPropertyFacility(
        name,
        description
      );
      util.setSuccess("Property facility submit successfully", 200);
      res.redirect("/admin/properties/facility");
    } catch (err) {
      util.setError(err, {}, 400);
      util.send(res);
    }
  }

  static async getSinglePropertyFacility(req, res, next) {
    try {
      const { id } = req.body;
      const facility =
        await propertyManagementServices.getSinglePropertyFacility(id);
      if (!facility) {
        util.setError({}, "Facility does not exist", 404);
        return util.send(res);
      }
      return res.json({
        message: "Property facility retrieved successfully",
        status: 200,
        facility,
      });
    } catch (err) {
      util.setError(err, {}, 400);
      util.send(res);
    }
  }

  static async editPropertyFacility(req, res, next) {
    try {
      const { id, name, description } = req.body;
      const facility =
        await propertyManagementServices.getSinglePropertyFacility(id);
      if (!facility) {
        util.setError({}, "Facility does not exist", 404);
        return util.send(res);
      }
      await propertyManagementServices.editPropertyFacility(
        id,
        name,
        description
      );
      util.setSuccess("Property facility updated successfully", 200);
      util.send(res);
    } catch (err) {
      util.setError(err, {}, 400);
      util.send(res);
    }
  }

  static async deletePropertyFacility(req, res, next) {
    try {
      const { id } = req.body;
      const facility =
        await propertyManagementServices.getSinglePropertyFacility(id);
      if (!facility) {
        util.setError({}, "Facility does not exist", 404);
        return util.send(res);
      }
      await propertyManagementServices.deletePropertyFacility(id);
      util.setSuccess("Property facility deleted successfully", 200);
      util.send(res);
    } catch (err) {
      util.setError(err, {}, 400);
      util.send(res);
    }
  }

  static async submitProperty(req, res, next) {
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
      const isPending = "false";
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
      console.log(err);
      util.setError(err, {}, 400);
      util.send(res);
    }
  }

  static async propertiesManagementPage(req, res, next) {
    try {
      const username = await jwtServices.retrieveUser(req.cookies.token);
      const user = await usersServices.retrieveUser(username);
      const isLoggedIn = true;
      const properties = await propertyManagementServices.getAllProperties();
      const settings = await settingsServices.getAllSettings();
      const unreadMessagesCount = await messagesServices.unreadMessages();
      return res.render("admin/property/propertyManagement", {
        title: `${settings[0].title} - مدیریت املاک`,
        user,
        isLoggedIn,
        properties,
        settings,
        unreadMessagesCount,
      });
    } catch (err) {
      util.setError(err, {}, 400);
      util.send(res);
    }
  }

  static async editPropertyPage(req, res, next) {
    try {
      const username = await jwtServices.retrieveUser(req.cookies.token);
      const user = await usersServices.retrieveUser(username);
      const isLoggedIn = true;
      const { id } = req.params;
      const property = await propertyManagementServices.getPropertyByPropertyID(
        id
      );
      if (!property) {
        return res.redirect("/admin/properties");
      }
      const propertyStatus =
        await propertyManagementServices.getAllPropertyStatus();
      const propertyCategories =
        await propertyManagementServices.getAllPropertyCategories();
      const propertyFacilities =
        await propertyManagementServices.getAllPropertyFacilities();
      const settings = await settingsServices.getAllSettings();
      const unreadMessagesCount = await messagesServices.unreadMessages();
      return res.render("admin/property/editProperty", {
        title: `${settings[0].title} - ویرایش ملک ${property.title}`,
        user,
        isLoggedIn,
        property,
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

  static async editProperty(req, res, next) {
    try {
      const {
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
        address,
        facilityIDs,
      } = req.body;
      const removedPictures = req.body.removePictures.split(",");
      const facilities = req.body.facilityIDs.split("-").filter((i) => i);
      const property = await propertyManagementServices.getPropertyByID(id);
      if (!property) {
        return res.redirect("/admin/properties");
      }
      await propertyManagementServices.editProperty(
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
      );
      if (property.status != status) {
        await propertyManagementServices.removePropertyIDinFormerPropertyStatus(
          property.status,
          id
        );
        await propertyManagementServices.addPropertyIDinPropertyStatus(
          status,
          id
        );
      }
      if (property.category != category) {
        await propertyManagementServices.removePropertyIDinFormerPropertyCategory(
          property.category,
          id
        );
        await propertyManagementServices.addPropertyIDinPropertyCategory(
          category,
          id
        );
      }
      if (facilities.length > 0) {
        await propertyManagementServices.editPropertyFacilities(facilities, id);
      }
      if (req.files.mainPicture) {
        await propertyManagementServices.removeOldMainPicture(
          id,
          property.mainPicture
        );
        await propertyManagementServices.editMainPicture(
          id,
          `/images/uploads/properties/${req.files.mainPicture[0].filename}`
        );
      }
      console.log(removedPictures);
      if (removedPictures) {
        await propertyManagementServices.removeOtherPicturesDB(
          id,
          removedPictures
        );
        await propertyManagementServices.removePicturesFromHost(
          removedPictures
        );
      }
      if (req.files.otherPictures) {
        await propertyManagementServices.editOtherPictures(
          id,
          req.files.otherPictures
        );
      }
      util.setSuccess("Property edited successfully", 200);
      return util.send(res);
    } catch (err) {
      console.log(err);
      util.setError(err, {}, 400);
      util.send(res);
    }
  }

  static async deleteProperty(req, res, next) {
    try {
      const { id } = req.body;
      const property = await propertyManagementServices.getPropertyByID(id);
      if (!property) {
        util.setError({}, `Property doesn't exist`);
        return util.send(res);
      }
      await propertyManagementServices.deleteProperty(id);
      await propertyManagementServices.deletePropertyFromCategoryPropertyID(
        property.category,
        id
      );
      await propertyManagementServices.deletePropertyFromStatusPropertyID(
        property.status,
        id
      );
      util.setSuccess("Property deleted successfully", 200);
      return util.send(res);
    } catch (err) {
      console.log(err);
      util.setError(err, {}, 400);
      util.send(res);
    }
  }

  static async getPendingPropertiesPage(req, res) {
    try {
      const username = await jwtServices.retrieveUser(req.cookies.token);
      const user = await usersServices.retrieveUser(username);
      const isLoggedIn = true;
      const properties =
        await propertyManagementServices.getAllPendingProperties();
      const settings = await settingsServices.getAllSettings();
      const unreadMessagesCount = await messagesServices.unreadMessages();
      return res.render("admin/property/pendingProperty", {
        title: `${settings[0].title} - املاک در انتظار تایید`,
        user,
        isLoggedIn,
        properties,
        settings,
        unreadMessagesCount,
      });
    } catch (err) {
      util.setError(err, {}, 400);
      util.send(res);
    }
  }

  static async changePendingProperies(req, res) {
    try {
      const { id } = req.body;
      if (!id) {
        util.setError({}, "ID of property is empty", 404);
        return util.send(res);
      }
      const property = await propertyManagementServices.getPropertyByPropertyID(
        id
      );
      if (!property) {
        util.setError({}, "Property is not found", 404);
        return util.send(res);
      }
      await propertyManagementServices.changePendingProperties(property._id);
      util.setSuccess("Property activated successfully", 200);
      return util.send(res);
    } catch (err) {
      util.setError(err, {}, 400);
      util.send(res);
    }
  }

  static async sendPropertyTelegram(req, res) {
    try {
      const { propertyID } = req.body;
      console.log(req.body);
      if (!propertyID) {
        util.setError({}, "Invalid request", 404);
        return util.send(res);
      }
      await telegramServices.sendToChannel(propertyID);
    } catch (err) {
      console.log(err);
      util.setError(err, {}, 400);
      return util.send(res);
    }
  }
};
