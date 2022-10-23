const express = require("express");
const { Router } = express;
const productsRouter = Router();

const { isAuthenticated, isNotAuthenticated, isAdmin } = require("../middlewares/auth");
const ProductController = require("../controllers/ProductController");

const productController = new ProductController();

productsRouter.get("/:id?", productController.getById);

productsRouter.post("/", isAdmin, productController.createProduct);

productsRouter.patch("/:id", isAdmin, productController.updateProduct);

productsRouter.delete("/:id", isAdmin, productController.deleteProduct);

module.exports = productsRouter;
