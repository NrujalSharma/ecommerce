const express = require("express");
const logger = require("pino")();

const appRouter = express.Router();

const authRouter = require("./auth/routes");

appRouter.use(express.json());
appRouter.use(express.urlencoded({ extended: true }));
appRouter.use(express.text());

appRouter.use("/auth", authRouter);

appRouter.use("*", (error, _, res, next) => {
    if (error) {
        logger.error(error.message);
        logger.error(error.stack);
        res.status(error.code || 500).send(error.message);
        return;
    }
    next();
});

appRouter.all("*", (_, res) => {
    res.status(404).send("Route not found");
});

module.exports = appRouter;
