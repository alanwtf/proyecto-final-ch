const express = require("express");
const { Router } = express;
const logger = require("../config/winston");
const UserDTO = require("../dtos/UserDTO");
const CartService = require("../services/CartService");
const { products, carts, users } = require("../daos")();

const AuthMiddleware = require("../middlewares/AuthMiddleware");

const appRouterFn = () => {
    const appRouter = new Router();
    const authMiddleware = new AuthMiddleware(process.env.JWT_SECRET);
    appRouter.use(authMiddleware.verifyToken.bind(authMiddleware));

    appRouter.get("/", (req, res) => {
        console.log("entre");

        if (req.user) return res.redirect("/api/products");
        return res.json({ error: "you must login", status: 401 });
    });

    appRouter.get("/home", async (req, res) => {
        const userDB = await users.getItemById(req.user.id);
        const user = new UserDTO(userDB);
        if (!user.cart_id) {
            const response = await cartService.createCart(req.user._id);
            //await users.addCart(user._id, response._id);
        }

        const response = await products.getItems();
        const allProducts = response.map((product) => ({
            name: product.name,
            photo_url: product.photo_url,
            description: product.description,
            price: product.price,
            _id: product._id,
        }));

        return res.render("partials/home", { user, allProducts: {} });
    });

    appRouter.get("/carrito", async (req, res) => {
        try {
            const user = await users.getItemById(req.user._id);

            const sanitizedUser = { name: user.name, photo_url: user.photo_url, _id: user._id, cart_id: user.cart_id };

            const response = await carts.getItemById(sanitizedUser.cart_id);
            console.log(response);
            const allProducts = response.products.map((product) => ({
                name: product.name,
                photo_url: product.photo_url,
                description: product.description,
                price: product.price,
                _id: product._id,
            }));

            return res.render("partials/cart", { sanitizedUser, cart: { allProducts, cart_id: response._id } });
        } catch (err) {
            logger.error(err);
        }
    });

    return appRouter;
};

module.exports = appRouterFn;
