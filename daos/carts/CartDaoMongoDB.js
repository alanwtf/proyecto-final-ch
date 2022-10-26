const MongoContainer = require("../../containers/MongoContainer");
const Cart = require("../../models/Cart");

class CartDaoMongoDB extends MongoContainer {
    constructor() {
        super(Cart);
    }

    createCart = async (userId) => {
        try {
            const newCart = this.model({ user_id: userId });
            newCart.save();
            return newCart;
        } catch (err) {
            logger.error(err);
        }
    };

    deleteProductFromCart = async (cartId, prodId) => {
        let cart;
        try {
            cart = await this.getItemById(cartId);
            cart.products.id(prodId).remove();
            await cart.save();
        } catch (err) {
            logger.error(err);
        }
    };

    getCartByUserId = async (id) => {
        let cart;
        try {
            cart = await this.model.findOne({ user_id: id });
        } catch (err) {
            logger.error(err);
        }
        return cart ? cart : undefined;
    };

    addCartProduct = async (id, product) => {
        let cart = await this.getItemById({ _id: id });
        console.log(cart);
        if (!cart.products) cart.products = [];
        console.log(cart.products, product);
        const idx = cart.products.findIndex((prod) => prod.productId.equals(product.productId));
        if (idx >= 0) cart.products[idx].quantity += product.quantity;
        else cart.products.push(product);
        console.log(idx);
        await cart.save();
    };
}

module.exports = CartDaoMongoDB;
