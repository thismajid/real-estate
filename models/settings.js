const mongoose = require("mongoose"); // Erase if already required
const Schema = mongoose.Schema;

// Declare the Schema of the Mongo model
const settingsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: "مشاور املاک",
    },
    headerLogo: {
      type: String,
      default: "/images/defaults/logo.png",
    },
    footerLogo: {
      type: String,
      default: "/images/defaults/logo2.png",
    },
    topSectionTitle: {
      type: String,
      default: "خانه رویایی خود را پیدا کنید",
    },
    middleSectionTitle: {
      type: String,
      default: "خانه بخرید یا بفروشید",
    },
    middleSectionDesc: {
      type: String,
      default:
        "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان خلاقی.",
    },
    middleSectionMainPage: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "PropertyStatus",
    },
    bottomSectionTitle: {
      type: String,
      default: "می خواهید خانه ایده آل خود را پیدا کنید؟",
    },
    bottomSectionDesc: {
      type: String,
      default:
        "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطر آنچنان که لازم است.",
    },
    address: {
      type: String,
    },
    lat: {
      type: String,
    },
    lng: {
      type: String,
      default: 51.5,
    },
    introduction: {
      type: String,
      default:
        "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد.",
    },
    attributes: [
      {
        type: String,
      },
    ],
    footerText: {
      type: String,
      trim: true,
      default:
        "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است.",
    },
    telegramBotToken: {
      type: String,
    },
    channelID: {
      type: String,
    },
    email: {
      type: String,
    },
    tell: {
      type: String,
    },
    instagram: {
      type: String,
    },
    twitter: {
      type: String,
    },
    telegram: {
      type: String,
    },
    facebook: {
      type: String,
    },
  },
  { timestamps: true }
);

//Export the model
module.exports = mongoose.model("Settings", settingsSchema);
