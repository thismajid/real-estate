const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
const messagesSchema = new mongoose.Schema(
  {
    messageID: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    tell: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    read: {
      type: String,
      enum: ["Yes", "No"],
      default: "No",
    },
  },
  { timestamps: true }
);

//Export the model
module.exports = mongoose.model("Messages", messagesSchema);
