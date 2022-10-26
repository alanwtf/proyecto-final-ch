const CartDTO = require("../dtos/CartDTO");
const cartDAOFactory = require("../factories/cartDAOFactory");

let instance = null;

class CartRepository {
    constructor() {
        this.dao = cartDAOFactory(process.env.STORAGE);
    }

    async createCart(userId) {
        const cart = await this.dao.createCart(userId);
        console.log(cart);
        const cartDTO = new CartDTO(cart);
        console.log(cartDTO);
        return cartDTO;
    }

    async getCartByUserId(userId) {
        const cart = await this.dao.getCartByUserId(userId);
        return cart ? new CartDTO(cart) : undefined;
    }

    async addCartProduct(cartId, product) {
        return await this.dao.addCartProduct(cartId, product);
    }

    async deleteProductFromCart(cartId, productId) {
        return await this.dao.deleteCartProduct(cartId, productId);
    }

    async getItems() {
        const carts = await this.dao.getItems();
        return carts;
    }

    async deleteItem(id) {
        const deleted = await this.dao.deleteItem(id);
        return deleted;
    }
    static getInstance() {
        if (instance) {
            return instance;
        }
        instance = new CartRepository();
        return instance;
    }
}

module.exports = CartRepository;
