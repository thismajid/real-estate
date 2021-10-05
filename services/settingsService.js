const Settings = require("../models/settings");
const PropertyStatus = require("../models/propertyStatus");
const fs = require("fs");
const path = require("path");

module.exports = class settingsService {
  static async allStatuses() {
    try {
      return await PropertyStatus.find();
    } catch (err) {
      throw err;
    }
  }

  static async getMiddleSettings() {
    try {
      return await Settings.find({}, { middleSectionMainPage: 1 }).populate(
        "middleSectionMainPage"
      );
    } catch (err) {
      throw err;
    }
  }

  static async updateTitle(title) {
    try {
      const settings = await Settings.find({});
      if (settings.length > 0) {
        return await Settings.findByIdAndUpdate(
          settings[0]._id,
          {
            title,
          },
          { new: true }
        );
      } else {
        return await new Settings({
          title,
        }).save();
      }
    } catch (err) {
      throw err;
    }
  }

  static async updateTopTitle(topTitle) {
    try {
      const settings = await Settings.find({});
      if (settings.length > 0) {
        return await Settings.findByIdAndUpdate(
          settings[0]._id,
          {
            topSectionTitle: topTitle,
          },
          { new: true }
        );
      } else {
        return await new Settings({
          topSectionTitle: topTitle,
        }).save();
      }
    } catch (err) {
      throw err;
    }
  }

  static async updateMiddleTitle(middleTitle) {
    try {
      const settings = await Settings.find({});
      if (settings.length > 0) {
        return await Settings.findByIdAndUpdate(
          settings[0]._id,
          {
            middleSectionTitle: middleTitle,
          },
          { new: true }
        );
      } else {
        return await new Settings({
          middleSectionTitle: middleTitle,
        }).save();
      }
    } catch (err) {
      throw err;
    }
  }

  static async updateMiddleDesc(middleDesc) {
    try {
      const settings = await Settings.find({});
      if (settings.length > 0) {
        return await Settings.findByIdAndUpdate(
          settings[0]._id,
          {
            middleSectionDesc: middleDesc,
          },
          { new: true }
        );
      } else {
        return await new Settings({
          middleSectionDesc: middleDesc,
        }).save();
      }
    } catch (err) {
      throw err;
    }
  }

  static async updateBottomTitle(bottomTitle) {
    try {
      const settings = await Settings.find({});
      if (settings.length > 0) {
        return await Settings.findByIdAndUpdate(
          settings[0]._id,
          {
            bottomSectionTitle: bottomTitle,
          },
          { new: true }
        );
      } else {
        return await new Settings({
          bottomSectionTitle: bottomTitle,
        }).save();
      }
    } catch (err) {
      throw err;
    }
  }

  static async updateBottomDesc(bottomDesc) {
    try {
      const settings = await Settings.find({});
      if (settings.length > 0) {
        return await Settings.findByIdAndUpdate(
          settings[0]._id,
          {
            bottomSectionDesc: bottomDesc,
          },
          { new: true }
        );
      } else {
        return await new Settings({
          bottomSectionDesc: bottomDesc,
        }).save();
      }
    } catch (err) {
      throw err;
    }
  }

  static async updateStatus(statusID) {
    try {
      const settings = await Settings.find({});
      if (settings.length > 0) {
        return await Settings.findByIdAndUpdate(
          settings[0]._id,
          {
            middleSectionMainPage: statusID,
          },
          { new: true }
        );
      } else {
        return await new Settings({
          middleSectionMainPage: statusID,
        }).save();
      }
    } catch (err) {}
  }

  static async updateHeaderLogo(logo) {
    try {
      const settings = await Settings.find({});
      if (settings.length > 0) {
        if (!settings[0].headerLogo.includes("defaults")) {
          await fs.unlinkSync(path.join(__dirname, `../public/${logo}`));
        }
        return await Settings.findByIdAndUpdate(
          settings[0]._id,
          {
            headerLogo: `/images/${logo}`,
          },
          { new: true }
        );
      } else {
        return await new Settings({
          logo: `/images/${logo}`,
        }).save();
      }
    } catch (err) {
      throw err;
    }
  }

  static async updateFooterLogo(logo) {
    try {
      const settings = await Settings.find({});
      if (settings.length > 0) {
        if (!settings[0].footerLogo.includes("defaults")) {
          await fs.unlinkSync(path.join(__dirname, `../public/${logo}`));
        }
        return await Settings.findByIdAndUpdate(
          settings[0]._id,
          {
            footerLogo: `/images/${logo}`,
          },
          { new: true }
        );
      } else {
        return await new Settings({
          logo: `/images/${logo}`,
        }).save();
      }
    } catch (err) {
      throw err;
    }
  }

  static async updateFooterText(footerText) {
    try {
      const settings = await Settings.find({});
      if (settings.length > 0) {
        return await Settings.findByIdAndUpdate(
          settings[0]._id,
          {
            footerText,
          },
          { new: true }
        );
      } else {
        return await new Settings({
          footerText,
        }).save();
      }
    } catch (err) {
      throw err;
    }
  }

  static async getAllSettings() {
    try {
      return await Settings.find().populate("middleSectionMainPage").exec();
    } catch (err) {
      throw err;
    }
  }

  static async changeContact(address, email, tell, lat, lng) {
    try {
      const settings = await Settings.find({});
      if (settings.length > 0) {
        return await Settings.findByIdAndUpdate(
          settings[0]._id,
          {
            address,
            email,
            tell,
            lat,
            lng,
          },
          { new: true }
        );
      } else {
        return await new Settings({
          address,
          email,
          tell,
          lat,
          lng,
        }).save();
      }
    } catch (err) {
      throw err;
    }
  }

  static async socialNetworks(instagram, telegram, twitter, facebook) {
    try {
      const settings = await Settings.find({});
      if (settings.length > 0) {
        return await Settings.findByIdAndUpdate(
          settings[0]._id,
          {
            instagram,
            telegram,
            twitter,
            facebook,
          },
          { new: true }
        );
      } else {
        return await new Settings({
          instagram,
          telegram,
          twitter,
          facebook,
        }).save();
      }
    } catch (err) {
      throw err;
    }
  }

  static async setAbout(introduction, attributes) {
    try {
      const settings = await Settings.find({});
      if (settings.length > 0) {
        await Settings.findByIdAndUpdate(
          settings[0]._id,
          {
            $set: {
              attributes: [],
            },
          },
          { new: true }
        );
        await Settings.findByIdAndUpdate(
          settings[0]._id,
          {
            introduction,
          },
          { new: true }
        );
        await attributes.forEach(async (attr) => {
          await Settings.findByIdAndUpdate(
            settings[0]._id,
            {
              $push: { attributes: attr },
            },
            { new: true }
          );
        });
      } else {
        return await new Settings({
          introduction,
        }).save();
      }
    } catch (err) {
      throw err;
    }
  }

  static async updateTokenAndChannelID(telegramBotToken, channelID) {
    try {
      const settings = await Settings.find({});
      if (settings.length > 0) {
        return await Settings.findByIdAndUpdate(
          settings[0]._id,
          {
            telegramBotToken,
            channelID,
          },
          { new: true }
        );
      } else {
        return await new Settings({
          telegramBotToken,
          channelID,
        }).save();
      }
    } catch (err) {
      throw err;
    }
  }
};
