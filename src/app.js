const express = require("express");
const connectDB = require("./config/database.js");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { sendErrorResponse } = require("./utils/customResponse.js");

require("dotenv").config();

const apiRouter = require("./routes/index.js");

// Constants
const app = express();
const PORT = process.env.PORT || 8888;
const corsOptions = {
  origin: true,
  credentials: true,
  methodes: "*",
};

//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

// Entry point
app.get("/", (req, res) => {
  return res.status(200).json({
    status: 200,
    message: "Welcome to Devfolio API",
  });
});

//routers
app.use("/api", apiRouter);

//error handling middleware
app.use((err, req, res, next) => {
  console.log(err);
  sendErrorResponse(res, err); // Send the error response
});

// Unknown routes
app.use("*", (req, res) => {
  return res.status(404).json({
    status: 404,
    message: `Cannot find ${req.method} ${req.url}`,
    error: "Not Found",
  });
});

//connect DB
connectDB()
  .then(() => {
    console.log("DB connected");
    app.listen(PORT, () => console.log(`Server running on ${PORT}`));
  })
  .catch((err) => {
    console.log(err.message);
  });

//Handle gracefull shutdown
let gracefulExit = function () {
  mongoose.connection.close(function () {
    console.log(
      "Mongoose default connection is disconnected through app termination"
    );
    process.exit(0);
  });
};

// If the Node process ends, close the Mongoose connection
process.on("SIGINT", gracefulExit).on("SIGTERM", gracefulExit);
