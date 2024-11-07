const express = require("express");
const AuthRouter = require("./AuthRouter");
const PortfolioRouter = require("./PortfolioRouter");
const AboutRouter = require("./AboutRouter");
const ProjectRouter = require("./ProjectRouter");
const ServiceRouter = require("./ServiceRouter");
const SkillRouter = require("./SkillRouter");

const apiRouter = express.Router();

apiRouter.use("/auth", AuthRouter);
apiRouter.use("/portfolio", PortfolioRouter);
apiRouter.use("/about", AboutRouter);
apiRouter.use("/project", ProjectRouter);
apiRouter.use("/service", ServiceRouter);
apiRouter.use("/skill", SkillRouter);

module.exports = apiRouter;
