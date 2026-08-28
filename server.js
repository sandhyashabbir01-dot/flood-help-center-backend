const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const Contact = require("./models/Contact");
const Help = require("./models/Help");

const app = express();


// ==================== CORS ====================

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "https://flood-help-center-git-main-sandhya-proect.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(express.json());


// ==================== SERVER TEST ====================

app.get("/", (req, res) => {
  res.send("Server is running!");
});


// ==================== HELP ROUTE TEST ====================

app.get("/test-help", (req, res) => {
  res.send("Help route is working!");
});


// ==================== CONTACT FORM ====================

app.post("/contact", async (req, res) => {
  console.log("CONTACT ROUTE HIT");
  console.log("DATA RECEIVED:", req.body);

  try {
    const { name, email, message } = req.body;

    const newContact = new Contact({
      name,
      email,
      message,
    });

    await newContact.save();

    res.json({
      message: "Your message has been saved successfully!",
    });

  } catch (error) {

    console.log("Error saving contact:", error);

    res.status(500).json({
      message: "Something went wrong!",
    });

  }
});


// ==================== SUBMIT HELP REQUEST ====================

app.post("/help", async (req, res) => {

  console.log("HELP ROUTE HIT");
  console.log("HELP DATA RECEIVED:", req.body);

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
      message: "Your help request has been submitted successfully!",
    });

  } catch (error) {

    console.log("Error saving help request:", error);

    res.status(500).json({
      message: "Something went wrong!",
    });

  }
});


// ==================== GET ALL HELP REQUESTS ====================

app.get("/help", async (req, res) => {

  console.log("GET HELP REQUESTS");

  try {

    const requests = await Help.find().sort({
      _id: -1,
    });

    res.json(requests);

  } catch (error) {

    console.log("Error getting help requests:", error);

    res.status(500).json({
      message: "Could not get help requests!",
    });

  }
});

// ==================== UPDATE HELP REQUEST STATUS ====================

app.put("/help/:id/status", async (req, res) => {
  console.log("UPDATE STATUS:", req.params.id);
  console.log("NEW STATUS:", req.body.status);

  try {
    const { status } = req.body;

    const updatedRequest = await Help.findByIdAndUpdate(
  req.params.id,
  { status },
  { returnDocument: "after" }
);

    if (!updatedRequest) {
      return res.status(404).json({
        message: "Help request not found!",
      });
    }

    res.json({
      message: "Help request status updated successfully!",
      request: updatedRequest,
    });

  } catch (error) {
    console.log("Error updating status:", error);

    res.status(500).json({
      message: "Could not update help request status!",
    });
  }
});
// ==================== DELETE HELP REQUEST ====================

app.delete("/help/:id", async (req, res) => {

  console.log("DELETE HELP REQUEST:", req.params.id);

  try {

    const deletedRequest = await Help.findByIdAndDelete(
      req.params.id
    );

    if (!deletedRequest) {

      return res.status(404).json({
        message: "Help request not found!",
      });

    }

    res.json({
      message: "Help request deleted successfully!",
    });

  } catch (error) {

    console.log("Error deleting help request:", error);

    res.status(500).json({
      message: "Could not delete help request!",
    });

  }
});

console.log("MONGO_URI exists:", !!process.env.MONGO_URI);
// ==================== MONGODB CONNECTION ====================

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {

    console.log("MongoDB connected successfully!");

  })
  .catch((error) => {

    console.log("MongoDB connection error:", error);

  });


// ==================== BACKEND PORT ====================

const PORT = 5000;

app.listen(PORT, () => {

  console.log(
    `Backend running on http://localhost:${PORT}`
  );

});