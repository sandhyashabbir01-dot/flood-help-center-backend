const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
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

    address: {
      type: String,
      required: true,
    },

    products: [
      {
        id: Number,
        name: String,
        price: Number,
        quantity: Number,
      },
    ],

    total: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: ["Pending", "Processing", "Completed"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", OrderSchema);