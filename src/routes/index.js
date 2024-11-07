const express = require("express");
const AuthRouter = require("./AuthRouter");
const PortfolioRouter = require("./PortfolioRouter");
const AboutRouter = require("./AboutRouter");
const ProjectRouter = require("./ProjectRouter");

const apiRouter = express.Router();

apiRouter.use("/auth", AuthRouter);
apiRouter.use("/portfolio", PortfolioRouter);
apiRouter.use("/about", AboutRouter);
apiRouter.use("/project", ProjectRouter);

module.exports = apiRouter;
