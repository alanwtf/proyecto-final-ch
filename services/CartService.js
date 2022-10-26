const CartRepository = require("../repositories/CartRepository");
const ProductService = require("../services/ProductService");
//TODO
//const logger = require("../utils/logger");

class CartService {
    constructor() {
        this.repository = CartRepository.getInstance();
    }

    async getAll() {
        const carts = await this.repository.getItems();
        return carts;
    }

    async getById(cartId) {
        const cart = await this.repository.getItemById(cartId);
        return cart;
    }

    async createCart(userId) {
        await this.repository.createCart(userId);
    }

    async getCartByUserId(userId) {
        const data = await this.repository.getCartByUserId(userId);
        return data;
    }

    async deleteCart(cartId) {
        console.log({ cartId });
        return await this.repository.deleteItem(cartId);
    }

    async addCartProduct(cartId, product) {
        return await this.repository.addCartProduct(cartId, product);
    }

    async deleteProductFromCart(cartId, productId) {
        return await this.repository.deleteProductFromCart(cartId, productId);
    }
}

module.exports = CartService;
