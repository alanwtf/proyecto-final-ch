const OrderRepository = require("../repositories/OrderRepository");
const OrderService = require("../services/OrderService");

const ProductRepository = require("../repositories/ProductRepository");
const ProductService = require("../services/ProductService");
const sendMail = require("../utils/sendMail");

class CartController {
    constructor(service) {
        this.service = service;
    }

    getCart = async (req, res, next) => {
        try {
            console.log("entra");
            const cart = await this.service.getCartByUserId(req.user.id);
            console.log({ cart });

            return res.json(cart);
        } catch (err) {
            next(err);
        }
    };

    _createCart = async (req, res, next) => {
        try {
            const newCart = await this.service.createCart(req.body.userId);
            return res.json(newCart);
        } catch (err) {
            return next(err);
        }
    };

    addProductsToCart = async (req, res, next) => {
        try {
            const product = req.body;
            if (!this.service.getCartByUserId(req.user.id)) await this.service.createCart(req.user.id);
            await this.service.addCartProduct(req.user.id, product);
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
            await this.service.deleteProductFromCart(req.user.id, req.params.prodId);
            console.log("sip");
            return res.sendStatus(204);
        } catch (err) {
            return next(err);
        }
    };

    generateOrder = async (req, res) => {
        try {
            const productRepository = ProductRepository.getInstance();
            const productService = new ProductService(productRepository);

            const orderRepository = OrderRepository.getInstance();
            const orderService = new OrderService(orderRepository);

            const cart = await this.service.getCartByUserId(req.user.id);
            const orderNumber = await orderService.getCount();

            const completeProducts = await Promise.all(
                cart.products.map(async (prod) => {
                    const product = await productService.getOne(prod.productId);
                    product.quantity = prod.quantity;

                    return product;
                })
            );

            const order = {
                products: completeProducts,
                orderNumber,
                userEmail: req.user.email,
                state: "generated",
            };

            const generatedOrder = await orderService.createOrder(order);

            const formattedProducts = cart.products.map(
                (product) =>
                    `Producto: ${product.title} <br />
            Precio: ${product.price}
            `
            );
            await sendMail(
                process.env.ADMIN_EMAIL,
                `Nuevo pedido de ${req.user.name} - ${req.user.email}`,
                `<p>${formattedProducts.join("</p><p>")}</p>`
            );

            return res.json(generatedOrder);
        } catch (err) {
            return next(err);
        }
    };
}

module.exports = CartController;
