const mongoose = require("mongoose"); // Erase if already required
const mongoosePaginate = require("mongoose-paginate-v2");
const Schema = mongoose.Schema;

// Declare the Schema of the Mongo model
const propertySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      index: true,
    },
    description: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    region: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    mainPicture: {
      type: String,
    },
    otherPictures: [{ type: String }],
    propertyID: {
      type: String,
      required: true,
    },
    constructionYear: {
      type: String,
    },
    price: {
      type: String,
    },
    parking: {
      type: String,
      default: "0",
    },
    area: {
      type: String,
      required: true,
    },
    bathroom: {
      type: String,
      default: "0",
    },
    bedroom: {
      type: String,
      default: "0",
    },
    likes: [{ type: String }],
    isPending: {
      type: String,
      enum: ["true", "false"],
      default: "false",
    },
    status: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "PropertyStatus",
    },
    category: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "PropertyCategory",
    },
  },
  { timestamps: true }
);

propertySchema.plugin(mongoosePaginate);

//Export the model
module.exports = mongoose.model("Property", propertySchema);
