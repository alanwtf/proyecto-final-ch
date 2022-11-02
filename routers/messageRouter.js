const express = require("express");
const { Router } = express;
const passport = require("passport");

const MessageRepository = require("../repositories/MessageRepository");
const MessageService = require("../services/MessageService");
const MessageController = require("../controllers/MessageController");

const messageRouterFn = () => {
    const messageRepository = MessageRepository.getInstance();
    const messageService = new MessageService(messageRepository);
    const messageController = new MessageController(messageService);

    const messageRouter = Router();

    messageRouter.use(passport.authenticate("jwt"));

    messageRouter.post(messageController.postMessage.bind(messageController));

    return messageRouter;
};

module.exports = messageRouterFn;
