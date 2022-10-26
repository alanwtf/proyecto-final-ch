const CartService = require("../services/CartService");
const { carts, products, users } = require("../daos")();
const sendMail = require("../utils/sendMail");
const sendSMS = require("../utils/sendSMS");
const sendWhatsapp = require("../utils/sendWhatsapp");
class CartController {
    constructor() {
        this.service = new CartService();
    }

    getAll = async (req, res, next) => {
        try {
            const carts = await this.service.getAll();
            return res.json(carts);
        } catch (err) {
            return next(err);
        }
    };

    createCart = async (req, res, next) => {
        try {
            const newCart = await this.service.createCart(req.body.userId);
            console.log(req.body.userId);
            return res.json(newCart);
        } catch (err) {
            return next(err);
        }
    };

    getById = async (req, res, next) => {
        try {
            const cart = await this.service.getById(req.params.id);
            return res.json(cart);
        } catch (err) {
            return next(err);
        }
    };

    getCartByUserId = async (req, res, next) => {
        try {
            const cart = await this.service.getCartByUserId(req.params.id);
            return res.json(cart);
        } catch (err) {
            return next(err);
        }
    };

    getCartProducts = async (req, res) => {
        const products = await this.service.getCartProducts(req.params.id);
    };

    addCartProduct = async (req, res, next) => {
        try {
            await this.service.addCartProduct(req.params.id, req.body.product);
            return res.sendStatus(204);
        } catch (err) {
            return next(err);
        }
    };

    deleteCart = async (req, res, next) => {
        try {
            await this.service.deleteCart(req.params.id);
            return res.sendStatus(204);
        } catch (err) {
            return next(err);
        }
    };

    deleteProductFromCart = async (req, res, next) => {
        try {
            await this.service.deleteProductFromCart(req.params.id, req.params.prodId);
            return res.sendStatus(204);
        } catch (err) {
            return next(err);
        }
    };

    // generateOrder = async (req, res) => {
    //     const cart = await this.service.getItemById(req.params.id);
    //     const formattedProducts = cart.products.map(
    //         (product) =>
    //             `Producto: ${product.name} <br />
    //         Precio: ${product.price}
    //         `
    //     );
    //     await sendMail(
    //         null,
    //         `Nuevo pedido de ${req.user.name} - ${req.user.email}`,
    //         `<p>${formattedProducts.join("</p><p>")}</p>`
    //     );
    //     const newUser = await users.deleteCart(cart._id);
    //     console.log(newUser);
    //     await sendSMS("La orden fue confirmada");
    //     await sendWhatsapp("Se ha creado una nueva orden de compra de parte de: " + req.user.name);
    //     return res.redirect("/home");
    // };
}

module.exports = CartController;
