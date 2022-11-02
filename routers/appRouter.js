const express = require("express");
const { Router } = express;
const logger = require("../config/winston");
const UserDTO = require("../dtos/UserDTO");
const AppController = require("../controllers/AppController");
const AppService = require("../services/AppService");

const appRouterFn = () => {
    const appRouter = new Router();
    const appService = new AppService();
    const appController = new AppController(appService);

    appRouter.get("/serverinfo", appController.getInfo.bind(appController));

    return appRouter;
};

module.exports = appRouterFn;
