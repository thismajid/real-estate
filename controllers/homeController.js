const Util = require("../utils/util");

const jwtServices = require("../services/jwtService");
const usersServices = require("../services/usersService");
const propertyServices = require("../services/propertyService");
const propertyManagementServices = require("../services/propertyManagementService");
const searchServices = require("../services/searchService");
const categoryServices = require("../services/categoryService");
const settingsServices = require("../services/settingsService");
const messagesServices = require("../services/messagesService");

const util = new Util();

module.exports = class homeController {
  static async getHome(req, res) {
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
      const properties = await propertyServices.getLatestProperties();
      const settings = await settingsServices.getAllSettings();
      const unreadMessagesCount = await messagesServices.unreadMessages();
      let middleSectionProperties;
      if (settings[0].middleSectionMainPage._id) {
        middleSectionProperties =
          await propertyServices.middleSectionProperties(
            settings[0].middleSectionMainPage._id
          );
      }
      let socialNetwork = {};
      if (settings[0].instagram) {
        socialNetwork.instagram = settings[0].instagram.split(
          "http://instagram.com/"
        )[1];
      }
      if (settings[0].telegram) {
        socialNetwork.telegram = settings[0].telegram.split("http://t.me/")[1];
      }
      if (settings[0].twitter) {
        socialNetwork.twitter = settings[0].twitter.split(
          "http://twitter.com/"
        )[1];
      }
      if (settings[0].facebook) {
        socialNetwork.facebook =
          settings[0].facebook.split("http://fb.com/")[1];
      }
      return res.render("index", {
        title: `${settings[0].title}`,
        user,
        isLoggedIn,
        properties,
        propertyStatus,
        propertyCategories,
        settings,
        middleSectionProperties,
        socialNetwork,
        unreadMessagesCount,
      });
    } catch (err) {
      console.log(err);
      util.setError(err, {}, 400);
      util.send(res);
    }
  }

  static async search(req, res) {
    try {
      console.log(req.query);
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
      const { title, city, lowerPrice, highPrice, status, category, bedroom } =
        req.query;
      const query = await searchServices.getQuery(
        title,
        city,
        lowerPrice,
        highPrice,
        status,
        category,
        bedroom
      );
      if (query) {
        const properties = await searchServices.search(query);
        console.log(properties);
        const latestProperty = await propertyServices.latestProperty();
        const allCategories = await categoryServices.allCategories();
        const settings = await settingsServices.getAllSettings();
        const unreadMessagesCount = await messagesServices.unreadMessages();
        const propertyStatus =
          await propertyManagementServices.getAllPropertyStatus();
        const propertyCategories =
          await propertyManagementServices.getAllPropertyCategories();
        return res.render("search", {
          title: `${settings[0].title} - املاک جستجو شده`,
          user,
          isLoggedIn,
          properties,
          latestProperty,
          allCategories,
          settings,
          unreadMessagesCount,
          propertyStatus,
          propertyCategories,
        });
      }
    } catch (err) {
      console.log(err);
      util.setError(err, {}, 400);
      util.send(res);
    }
  }

  static async contactPage(req, res) {
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
      const settings = await settingsServices.getAllSettings();
      const unreadMessagesCount = await messagesServices.unreadMessages();
      return res.render("contact", {
        title: `${settings[0].title} - تماس با ما`,
        user,
        isLoggedIn,
        settings,
        unreadMessagesCount,
      });
    } catch (err) {
      util.setError(err, {}, 400);
      return util.send(res);
    }
  }

  static async aboutPage(req, res) {
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
      const settings = await settingsServices.getAllSettings();
      const unreadMessagesCount = await messagesServices.unreadMessages();
      return res.render("about", {
        title: `${settings[0].title} - درباره ما`,
        user,
        isLoggedIn,
        settings,
        unreadMessagesCount,
      });
    } catch (err) {
      util.setError(err, {}, 400);
      return util.send(res);
    }
  }
};
