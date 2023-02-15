const { type } = require("express/lib/response");
const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Please add an email."],
      unique: true,
    },

    password: {
      type: String,
      rquired: [true, "Please add a password."],
    },
    savedItems: [String],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
