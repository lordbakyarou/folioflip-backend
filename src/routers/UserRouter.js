const express = require("express");

const UserRouter = express.Router();

//Register route
UserRouter.post("/register", async (req, res) => {
  try {
    const data = req.body;
    console.log(data);
    res.send("Working");
  } catch (error) {
    res
      .status(error?.status || 500)
      .json(error?.message || "Internal server Error");
  }
});

module.exports = UserRouter;

//while creating the portfolio.
//i will create portfolio schema
//have api to create the portfolio /createPortfolio
//when i create i will add data in aboutSchema
