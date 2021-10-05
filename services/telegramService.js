const Settings = require("../models/settings");
const Property = require("../models/property");
const path = require("path");

const { Bot, InputFile } = require("grammy");

module.exports = class TelegramService {
  static async sendToChannel(id) {
    try {
      const settings = await Settings.find(
        {},
        { telegramBotToken: 1, channelID: 1 }
      );
      if (!settings[0].channelID) {
        throw new Error("Channel ID doesn't exist");
      }
      const property = await Property.findById(id);
      const bot = new Bot(settings[0].telegramBotToken);
      const message = `<b>${property.title}</b>
      \n
      ${property.description}
      \n\n
      <a href='http://${process.env.HOST}/property/${property.propertyID}'>مشاهده ملک</a>
      `;
      await bot.api.sendPhoto(
        settings[0].channelID,
        new InputFile(
          path.join(__dirname, `../public/${property.mainPicture}`)
        ),
        { caption: message, parse_mode: "html" }
      );
      console.log(settings);
      console.log(property.mainPicture);
    } catch (err) {
      throw err;
    }
  }
};
