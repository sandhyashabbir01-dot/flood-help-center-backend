const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const Contact = require("./models/Contact");
const Help = require("./models/Help");

const app = express();

/* =========================================================
   ORDER SCHEMA & MODEL
========================================================= */

const orderSchema = new mongoose.Schema({
  name: { type: String, required: true },

  email: { type: String, required: true },

  phone: { type: String, required: true },

  address: { type: String, required: true },

  items: [
    {
      id: Number,
      name: String,
      price: Number,
      quantity: Number,
      icon: String,
    },
  ],

  totalAmount: {
    type: Number,
    required: true,
  },

  status: {
    type: String,
    enum: [
      "Received",
      "Processing",
      "Shipped",
      "Completed",
    ],
    default: "Received",
  },

  date: {
    type: String,
    default: () =>
      new Date().toLocaleDateString(),
  },
});

const Order =
  mongoose.models.Order ||
  mongoose.model("Order", orderSchema);


/* =========================================================
   INVENTORY SCHEMA & MODEL
========================================================= */

const inventorySchema = new mongoose.Schema(
  {
    productId: {
      type: Number,
      required: true,
      unique: true,
    },

    productName: {
      type: String,
      required: true,
    },

    icon: {
      type: String,
      default: "📦",
    },

    added: {
      type: Number,
      required: true,
      default: 50,
    },

    sold: {
      type: Number,
      required: true,
      default: 0,
    },

    remaining: {
      type: Number,
      required: true,
      default: 50,
    },
  },
  {
    timestamps: true,
  }
);

const Inventory =
  mongoose.models.Inventory ||
  mongoose.model(
    "Inventory",
    inventorySchema
  );


/* =========================================================
   CORS
========================================================= */

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://flood-help-center.vercel.app",
];

app.use((req, res, next) => {
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.header(
      "Access-Control-Allow-Origin",
      origin
    );
  }

  res.header(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,DELETE,OPTIONS"
  );

  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type"
  );

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});


/* =========================================================
   JSON
========================================================= */

app.use(express.json());


/* =========================================================
   SERVER TEST
========================================================= */

app.get("/", (req, res) => {
  res.send("Server is running!");
});


/* =========================================================
   HELP ROUTE TEST
========================================================= */

app.get("/test-help", (req, res) => {
  res.send("Help route is working!");
});


/* =========================================================
   CONTACT FORM
========================================================= */

app.post("/contact", async (req, res) => {
  console.log("CONTACT ROUTE HIT");
  console.log(
    "DATA RECEIVED:",
    req.body
  );

  try {
    const {
      name,
      email,
      message,
    } = req.body;

    const newContact = new Contact({
      name,
      email,
      message,
    });

    await newContact.save();

    res.json({
      message:
        "Your message has been saved successfully!",
    });
  } catch (error) {
    console.log(
      "Error saving contact:",
      error
    );

    res.status(500).json({
      message:
        "Something went wrong!",
    });
  }
});


/* =========================================================
   INVENTORY - DEFAULT PRODUCTS
========================================================= */

const defaultProducts = [
  {
    productId: 1,
    productName: "Food Relief Package",
    icon: "🥫",
    added: 50,
  },

  {
    productId: 2,
    productName: "Clean Water Pack",
    icon: "💧",
    added: 50,
  },

  {
    productId: 3,
    productName: "Medical First Aid Kit",
    icon: "🩹",
    added: 50,
  },

  {
    productId: 4,
    productName: "Emergency Shelter Kit",
    icon: "🏕️",
    added: 50,
  },

  {
    productId: 5,
    productName: "Emergency Essentials Kit",
    icon: "🎒",
    added: 50,
  },

  {
    productId: 6,
    productName: "Hygiene Supplies Pack",
    icon: "🧼",
    added: 50,
  },
];


/* =========================================================
   CREATE DEFAULT INVENTORY
========================================================= */

async function createDefaultInventory() {
  try {
    for (const product of defaultProducts) {
      const existingProduct =
        await Inventory.findOne({
          productId:
            product.productId,
        });

      if (!existingProduct) {
        await Inventory.create({
          productId:
            product.productId,

          productName:
            product.productName,

          icon: product.icon,

          added: product.added,

          sold: 0,

          remaining: product.added,
        });

        console.log(
          `Inventory created: ${product.productName}`
        );
      }
    }

    console.log(
      "Default inventory checked successfully!"
    );
  } catch (error) {
    console.log(
      "Error creating default inventory:",
      error
    );
  }
}


/* =========================================================
   GET INVENTORY
========================================================= */

app.get("/inventory", async (req, res) => {
  console.log("GET INVENTORY");

  try {
    await createDefaultInventory();

    const inventory =
      await Inventory.find().sort({
        productId: 1,
      });

    res.json(inventory);
  } catch (error) {
    console.log(
      "Error getting inventory:",
      error
    );

    res.status(500).json({
      message:
        "Could not get inventory!",
    });
  }
});


/* =========================================================
   UPDATE INVENTORY QUANTITY
========================================================= */

app.put(
  "/inventory/:productId",
  async (req, res) => {
    console.log(
      "UPDATE INVENTORY:",
      req.params.productId
    );

    try {
      const productId = Number(
        req.params.productId
      );

      const {
        added,
      } = req.body;

      if (
        !Number.isFinite(added) ||
        added < 0
      ) {
        return res.status(400).json({
          message:
            "Added quantity must be a valid number.",
        });
      }

      const inventory =
        await Inventory.findOne({
          productId,
        });

      if (!inventory) {
        return res.status(404).json({
          message:
            "Inventory product not found!",
        });
      }

      const newAdded = Number(added);

      const newRemaining =
        newAdded - inventory.sold;

      if (newRemaining < 0) {
        return res.status(400).json({
          message:
            "Added quantity cannot be less than sold quantity.",
        });
      }

      inventory.added =
        newAdded;

      inventory.remaining =
        newRemaining;

      await inventory.save();

      res.json({
        message:
          "Inventory updated successfully!",
        inventory,
      });
    } catch (error) {
      console.log(
        "Error updating inventory:",
        error
      );

      res.status(500).json({
        message:
          "Could not update inventory!",
      });
    }
  }
);


/* =========================================================
   CUSTOMER ORDERS
========================================================= */

app.post("/orders", async (req, res) => {
  console.log("ORDER ROUTE HIT");

  console.log(
    "ORDER DATA RECEIVED:",
    req.body
  );

  try {
    const {
      name,
      email,
      phone,
      address,
      items,
      totalAmount,
    } = req.body;


    /* -----------------------------------------------------
       BASIC VALIDATION
    ----------------------------------------------------- */

    if (
      !name ||
      !email ||
      !phone ||
      !address ||
      !items ||
      !Array.isArray(items) ||
      items.length === 0
    ) {
      return res.status(400).json({
        message:
          "Please provide complete order information.",
      });
    }


    /* -----------------------------------------------------
       CHECK INVENTORY BEFORE ORDER
    ----------------------------------------------------- */

    for (const item of items) {
      const inventory =
        await Inventory.findOne({
          productId: Number(
            item.id
          ),
        });

      if (!inventory) {
        return res.status(400).json({
          message:
            `${item.name} is not available in inventory.`,
        });
      }

      const requestedQuantity =
        Number(item.quantity);

      if (
        !Number.isFinite(
          requestedQuantity
        ) ||
        requestedQuantity <= 0
      ) {
        return res.status(400).json({
          message:
            `Invalid quantity for ${item.name}.`,
        });
      }

      if (
        requestedQuantity >
        inventory.remaining
      ) {
        return res.status(400).json({
          message:
            `Only ${inventory.remaining} units of ${item.name} are remaining.`,
        });
      }
    }


    /* -----------------------------------------------------
       CREATE ORDER
    ----------------------------------------------------- */

    const newOrder = new Order({
      name,
      email,
      phone,
      address,
      items,
      totalAmount,
    });

    await newOrder.save();


    /* -----------------------------------------------------
       UPDATE INVENTORY AFTER ORDER
    ----------------------------------------------------- */

    for (const item of items) {
      const inventory =
        await Inventory.findOne({
          productId: Number(
            item.id
          ),
        });

      if (inventory) {
        const quantitySold =
          Number(item.quantity);

        inventory.sold +=
          quantitySold;

        inventory.remaining =
          inventory.added -
          inventory.sold;

        await inventory.save();
      }
    }


    /* -----------------------------------------------------
       RESPONSE
    ----------------------------------------------------- */

    res.json({
      message:
        "Order placed successfully!",
      order: newOrder,
    });
  } catch (error) {
    console.log(
      "Error saving order:",
      error
    );

    res.status(500).json({
      message:
        "Could not save order!",
    });
  }
});


/* =========================================================
   GET ALL CUSTOMER ORDERS
========================================================= */

app.get("/orders", async (req, res) => {
  console.log(
    "GET CUSTOMER ORDERS"
  );

  try {
    const orders =
      await Order.find().sort({
        _id: -1,
      });

    res.json(orders);
  } catch (error) {
    console.log(
      "Error getting customer orders:",
      error
    );

    res.status(500).json({
      message:
        "Could not get customer orders!",
    });
  }
});


/* =========================================================
   UPDATE ORDER STATUS
========================================================= */

app.put(
  "/orders/:id/status",
  async (req, res) => {
    console.log(
      "UPDATE ORDER STATUS:",
      req.params.id
    );

    try {
      const {
        status,
      } = req.body;

      const updatedOrder =
        await Order.findByIdAndUpdate(
          req.params.id,
          { status },
          {
            returnDocument: "after",
          }
        );

      if (!updatedOrder) {
        return res.status(404).json({
          message:
            "Order not found!",
        });
      }

      res.json({
        message:
          "Order status updated successfully!",
        order: updatedOrder,
      });
    } catch (error) {
      console.log(
        "Error updating order status:",
        error
      );

      res.status(500).json({
        message:
          "Could not update order status!",
      });
    }
  }
);


/* =========================================================
   DELETE ORDER
========================================================= */

app.delete(
  "/orders/:id",
  async (req, res) => {
    console.log(
      "DELETE ORDER:",
      req.params.id
    );

    try {
      const deletedOrder =
        await Order.findByIdAndDelete(
          req.params.id
        );

      if (!deletedOrder) {
        return res.status(404).json({
          message:
            "Order not found!",
        });
      }

      res.json({
        message:
          "Order deleted successfully!",
      });
    } catch (error) {
      console.log(
        "Error deleting order:",
        error
      );

      res.status(500).json({
        message:
          "Could not delete order!",
      });
    }
  }
);


/* =========================================================
   SUBMIT HELP REQUEST
========================================================= */

app.post("/help", async (req, res) => {
  console.log("HELP ROUTE HIT");

  console.log(
    "HELP DATA RECEIVED:",
    req.body
  );

  try {
    const {
      name,
      email,
      phone,
      area,
      helpType,
      message,
    } = req.body;

    const newHelp = new Help({
      name,
      email,
      phone,
      area,
      helpType,
      message,
    });

    await newHelp.save();

    res.json({
      message:
        "Your help request has been submitted successfully!",
    });
  } catch (error) {
    console.log(
      "Error saving help request:",
      error
    );

    res.status(500).json({
      message:
        "Something went wrong!",
    });
  }
});


/* =========================================================
   GET ALL HELP REQUESTS
========================================================= */

app.get("/help", async (req, res) => {
  console.log(
    "GET HELP REQUESTS"
  );

  try {
    const requests =
      await Help.find().sort({
        _id: -1,
      });

    res.json(requests);
  } catch (error) {
    console.log(
      "Error getting help requests:",
      error
    );

    res.status(500).json({
      message:
        "Could not get help requests!",
    });
  }
});


/* =========================================================
   UPDATE HELP REQUEST STATUS
========================================================= */

app.put(
  "/help/:id/status",
  async (req, res) => {
    console.log(
      "UPDATE STATUS:",
      req.params.id
    );

    console.log(
      "NEW STATUS:",
      req.body.status
    );

    try {
      const {
        status,
      } = req.body;

      const updatedRequest =
        await Help.findByIdAndUpdate(
          req.params.id,
          { status },
          {
            returnDocument: "after",
          }
        );

      if (!updatedRequest) {
        return res.status(404).json({
          message:
            "Help request not found!",
        });
      }

      res.json({
        message:
          "Help request status updated successfully!",
        request:
          updatedRequest,
      });
    } catch (error) {
      console.log(
        "Error updating status:",
        error
      );

      res.status(500).json({
        message:
          "Could not update help request status!",
      });
    }
  }
);


/* =========================================================
   DELETE HELP REQUEST
========================================================= */

app.delete(
  "/help/:id",
  async (req, res) => {
    console.log(
      "DELETE HELP REQUEST:",
      req.params.id
    );

    try {
      const deletedRequest =
        await Help.findByIdAndDelete(
          req.params.id
        );

      if (!deletedRequest) {
        return res.status(404).json({
          message:
            "Help request not found!",
        });
      }

      res.json({
        message:
          "Help request deleted successfully!",
      });
    } catch (error) {
      console.log(
        "Error deleting help request:",
        error
      );

      res.status(500).json({
        message:
          "Could not delete help request!",
      });
    }
  }
);


/* =========================================================
   MONGODB CONNECTION
========================================================= */

console.log(
  "MONGO_URI exists:",
  !!process.env.MONGO_URI
);

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log(
      "MongoDB connected successfully!"
    );

    await createDefaultInventory();
  })
  .catch((error) => {
    console.log(
      "MongoDB connection error:",
      error
    );
  });


/* =========================================================
   LOCAL SERVER
========================================================= */

const PORT = 5000;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(
      `Backend running on http://localhost:${PORT}`
    );
  });
}


/* =========================================================
   VERCEL
========================================================= */

module.exports = app;