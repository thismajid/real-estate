const Util = require("../utils/util");

const jwtServices = require("../services/jwtService");
const usersServices = require("../services/usersService");
const categoryServices = require("../services/categoryService");
const propertyServices = require("../services/propertyService");
const settingsServices = require("../services/settingsService");
const messagesServices = require("../services/messagesService");
const propertyManagementServices = require("../services/propertyManagementService");

const util = new Util();

module.exports = class categoryController {
  static async getCategoryPage(req, res, next) {
    try {
      const perPage = 6;
      const page = req.query.page || 1;
      let order = { createdAt: "-1" };
      if (req.query.order == "lowPrice") {
        order = { price: "1", createdAt: "-1" };
      } else if (req.query.order == "highPrice") {
        order = { price: "-1", createdAt: "-1" };
      } else if (req.query.order == "newest") {
        order = { createdAt: "-1" };
      } else if (req.query.order == "oldest") {
        order = { createdAt: "1" };
      }
      const { name } = req.params;
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
      const category = await categoryServices.getCategory(name);
      const allCategories = await categoryServices.allCategories();
      const properties = await categoryServices.getAllPropertiesWithCategory(
        category.propertyID,
        perPage,
        page,
        order
      );
      const countProperties =
        await categoryServices.countAllPropertiesInCategory(
          category.propertyID
        );
      const latestProperty = await propertyServices.latestProperty();
      const settings = await settingsServices.getAllSettings();
      const unreadMessagesCount = await messagesServices.unreadMessages();
      const propertyStatus =
        await propertyManagementServices.getAllPropertyStatus();
      const propertyCategories =
        await propertyManagementServices.getAllPropertyCategories();
      return res.render("property/property-category-list", {
        title: `${settings[0].title} - دسته: ${name}`,
        user,
        isLoggedIn,
        shortName: name,
        categoryName: category.name,
        properties,
        latestProperty,
        allCategories,
        current: page,
        pages: Math.ceil(countProperties / perPage),
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
};
