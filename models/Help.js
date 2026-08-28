const mongoose = require("mongoose");

const helpSchema = new mongoose.Schema(
  {
   name: {
  type: String,
  required: true,
},

email: {
  type: String,
  required: true,
},

phone: {
      type: String,
      required: true,
    },

    area: {
      type: String,
      required: true,
    },

    helpType: {
      type: String,
      required: true,
    },

    message: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["Pending", "In Progress", "Completed"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Help", helpSchema);