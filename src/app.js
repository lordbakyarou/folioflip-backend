const express = require("express");
const connectDB = require("./config/database.js");
const mongoose = require("mongoose");
const AuthRouter = require("./routers/AuthRouter.js");
require("dotenv").config();

// const validator = require("validator");

const app = express();
const PORT = process.env.PORT || 8888;

//middlewares
app.use(express.json());

//routers
app.use("/auth", AuthRouter);

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
  console.log("hi");
  mongoose.connection.close(function () {
    console.log(
      "Mongoose default connection is disconnected through app termination"
    );
    process.exit(0);
  });
};

// If the Node process ends, close the Mongoose connection
process.on("SIGINT", gracefulExit).on("SIGTERM", gracefulExit);
