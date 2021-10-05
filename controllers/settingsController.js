const Util = require("../utils/util");

const jwtServices = require("../services/jwtService");
const usersServices = require("../services/usersService");
const settingsServices = require("../services/settingsService");
const messagesServices = require("../services/messagesService");

const util = new Util();

module.exports = class settingsController {
  static async getSettingsPage(req, res, next) {
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
      const statuses = await settingsServices.allStatuses();
      const middleSectionSettings = await settingsServices.getMiddleSettings();
      const settings = await settingsServices.getAllSettings();
      const unreadMessagesCount = await messagesServices.unreadMessages();
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
      return res.render("admin/settings/settingsPage", {
        title: `${settings[0].title} - تنظیمات`,
        user,
        isLoggedIn,
        statuses,
        statusSetting: middleSectionSettings,
        settings,
        socialNetwork,
        unreadMessagesCount,
      });
    } catch (err) {
      util.setError(err, {}, 400);
      util.send(res);
    }
  }

  static async main(req, res) {
    try {
      const {
        title,
        topTitle,
        middleTitle,
        middleDesc,
        status,
        bottomTitle,
        bottomDesc,
        footerText,
      } = req.body;
      if (title) {
        await settingsServices.updateTitle(title);
      }
      if (topTitle) {
        await settingsServices.updateTopTitle(topTitle);
      }
      if (middleTitle) {
        await settingsServices.updateMiddleTitle(middleTitle);
      }
      if (middleDesc) {
        await settingsServices.updateMiddleDesc(middleDesc);
      }
      if (status) {
        await settingsServices.updateStatus(status);
      }
      if (req.files.headerLogo) {
        await settingsServices.updateHeaderLogo(
          req.files.headerLogo[0].filename
        );
      }
      if (req.files.footerLogo) {
        await settingsServices.updateFooterLogo(
          req.files.footerLogo[0].filename
        );
      }
      if (bottomTitle) {
        await settingsServices.updateBottomTitle(bottomTitle);
      }
      if (bottomDesc) {
        await settingsServices.updateBottomDesc(bottomDesc);
      }
      if (footerText) {
        await settingsServices.updateFooterText(footerText);
      }
      util.setSuccess("Settings updated successfully", 200);
      return util.send(res);
    } catch (err) {
      console.log(err);
      util.setError(err, {}, 400);
      util.send(res);
    }
  }

  static async contact(req, res, next) {
    try {
      const { address, email, tell, lat, lng } = req.body;
      await settingsServices.changeContact(address, email, tell, lat, lng);
      util.setSuccess("Setting updated successfully", 200);
      return util.send(res);
    } catch (err) {
      util.setError(err, {}, 400);
      util.send(res);
    }
  }

  static async socialNetworks(req, res, next) {
    try {
      const { instagram, telegram, twitter, facebook } = req.body;
      await settingsServices.socialNetworks(
        instagram,
        telegram,
        twitter,
        facebook
      );
      util.setSuccess("Setting updated successfully", 200);
      return util.send(res);
    } catch (err) {
      util.setError(err, {}, 400);
      util.send(res);
    }
  }

  static async getContactPage(req, res, next) {
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
      return res.render("admin/settings/contact", {
        title: `${settings[0].title} - تنظیمات`,
        user,
        isLoggedIn,
        settings,
        unreadMessagesCount,
      });
    } catch (err) {
      util.setError(err, {}, 400);
      util.send(res);
    }
  }

  static async getSocialPage(req, res, next) {
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
      return res.render("admin/settings/socials", {
        title: `${settings[0].title} - تنظیمات`,
        user,
        isLoggedIn,
        settings,
        socialNetwork,
        unreadMessagesCount,
      });
    } catch (err) {
      util.setError(err, {}, 400);
      util.send(res);
    }
  }

  static async about(req, res) {
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
      return res.render("admin/settings/about", {
        title: `${settings[0].title} - تنظیمات`,
        user,
        isLoggedIn,
        settings,
        unreadMessagesCount,
      });
    } catch (err) {
      util.setError(err, {}, 400);
      util.send(res);
    }
  }

  static async setAbout(req, res) {
    try {
      const introduction = req.body.introduction;
      const attributes = JSON.parse(req.body.attributes);
      console.log(attributes);
      await settingsServices.setAbout(introduction, attributes);
      util.setSuccess("About settings updated successfully", 200);
      return util.send(res);
    } catch (err) {
      util.setError(err, {}, 400);
      return util.send(res);
    }
  }

  static async getBotPage(req, res) {
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
      return res.render("admin/settings/bot", {
        title: `${settings[0].title} - تنظیمات`,
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

  static async updateTokenAndChannelID(req, res) {
    try {
      const { telegramBotToken, channelID } = req.body;
      if (!telegramBotToken && !channelID) {
        util.setError({}, "Invalid request", 404);
        return util.send(res);
      }
      await settingsServices.updateTokenAndChannelID(
        telegramBotToken,
        channelID
      );
      util.setSuccess("Bot information updated successfully", 200);
      return util.send(res);
    } catch (err) {
      console.log(err);
      util.setError(err, {}, 400);
      return util.send(res);
    }
  }
};
