const express = require("express");
const AuthRouter = require("./AuthRouter");
const PortfolioRouter = require("./PortfolioRouter");

const apiRouter = express.Router();

apiRouter.use("/auth", AuthRouter);
apiRouter.use("/portfolio", PortfolioRouter);

module.exports = apiRouter;
