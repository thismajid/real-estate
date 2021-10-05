const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
const resetPasswordSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    userID: {
      type: String,
      required: true,
    },
    token: {
      type: String,
      required: true,
      unique: true,
    },
    isUsed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

//Export the model
module.exports = mongoose.model("Reset", resetPasswordSchema);
