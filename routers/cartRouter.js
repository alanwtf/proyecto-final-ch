const express = require("express");
const CartController = require("../controllers/CartController");
const { Router } = express;
const cartRouter = Router();

const cartController = new CartController();

cartRouter.post("/", cartController.createCart);

cartRouter.get("/", cartController.getAll);

cartRouter.delete("/:id", cartController.deleteCart);

cartRouter.get("/:id/productos", cartController.getById);

cartRouter.delete("/:id/productos/:prodId", cartController.deleteProductFromCart);

cartRouter.post("/:id/productos/", cartController.addCartProduct);

// cartRouter.post("/:id", cartController.generateOrder);

module.exports = cartRouter;
