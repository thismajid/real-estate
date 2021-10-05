const mongoose = require("mongoose"); // Erase if already required
const _ = require("lodash");

// Declare the Schema of the Mongo model
const propertyFacilitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    description: {
      type: String,
    },
    shortName: {
      type: String,
      required: true,
      unique: true,
    },
    propertyID: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

//Export the model
module.exports = mongoose.model("PropertyFacility", propertyFacilitySchema);
