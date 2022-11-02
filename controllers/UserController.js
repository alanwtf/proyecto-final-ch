const UserService = require("../services/UserService");

class UserController {
    constructor() {
        this.service = new UserService();
    }

    getAllUsers = async (_req, res) => {
        const users = this.service.getAll();
        return res.json(users);
    };

    getByEmail = async (req, res) => {
        if (req.body.email) {
            return res.json(await this.service.getByEmail(req.body.email));
        }
        return res.json(await this.service.getAll());
    };

    async addCart(userId, cartId) {
        await this.service.addCart(userId, cartId);
    }

    async deleteCart(cartId) {
        await this.service.deleteCart(cartId);
    }
}

module.exports = UserController;
