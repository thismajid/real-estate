const mongoose = require("mongoose"); // Erase if already required
const bcrypt = require("bcryptjs");

// Declare the Schema of the Mongo model
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      min: 3,
      max: 20,
    },
    lastName: {
      type: String,
      required: true,
      min: 3,
      max: 20,
    },
    username: {
      type: String,
      required: true,
      index: true,
      unique: true,
      min: 4,
      max: 20,
    },
    mobileNumber: {
      type: String,
      unique: true,
      min: 11,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^[a-zA-Z0-9.]+@[a-zA-Z0-9.]+\.[a-zA-Z]{2,4}/,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 70,
      match: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/,
      select: false,
    },
    role: {
      type: String,
      enum: ["user", "writer", "admin", "super admin"],
      default: "user",
    },
    status: {
      type: String,
      enum: ["active", "deactive"],
      default: "active",
    },
    avatar: {
      type: String,
      default: `/images/uploads/avatars/user-profile.png`,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  const user = this;
  try {
    if (this.isNew || this.isModified("password")) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(user.password, salt);
      return next();
    } else {
      return next();
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
});

userSchema.pre("findOneAndUpdate", async function (next) {
  try {
    if (this.getUpdate().$set.password) {
      const salt = await bcrypt.genSalt(10);
      this.getUpdate().$set.password = await bcrypt.hash(
        this.getUpdate().$set.password,
        salt
      );
      return next();
    } else {
      return next();
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
});

//Export the model
module.exports = mongoose.model("User", userSchema);
