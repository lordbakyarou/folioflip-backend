const express = require("express");
const AuthRouter = require("./AuthRouter");
const PortfolioRouter = require("./PortfolioRouter");
const AboutRouter = require("./AboutRouter");

const apiRouter = express.Router();

apiRouter.use("/auth", AuthRouter);
apiRouter.use("/portfolio", PortfolioRouter);
apiRouter.use("/about", AboutRouter);

module.exports = apiRouter;
