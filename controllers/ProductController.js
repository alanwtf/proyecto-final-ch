const { NetworkContext } = require("twilio/lib/rest/supersim/v1/network");
const ProductService = require("../services/ProductService");

class ProductController {
    constructor() {
        this.service = new ProductService();
    }

    getById = async (req, res) => {
        if (req.params.id) {
            return res.json(await this.service.getOne(req.params.id));
        }
        return res.json(await this.service.getAll());
    };

    createProduct = async (req, res, next) => {
        try {
            const newProduct = await this.service.createProduct(req.body);
            return res.json(newProduct);
        } catch (err) {
            return next(err);
        }
    };

    updateProduct = async (req, res, next) => {
        try {
            const updatedProduct = await this.service.updateProduct(req.params.id, req.body);
            return res.status(200).json(updatedProduct);
        } catch (err) {
            return next(err);
        }
    };

    deleteProduct = async (req, res, next) => {
        try {
            await this.service.deleteProduct(req.params.id);
            return res.sendStatus(204);
        } catch (err) {
            return next(err);
        }
    };
}

module.exports = ProductController;
