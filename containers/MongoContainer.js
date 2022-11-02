const logger = require("../config/winston");

class MongoContainer {
    constructor(model) {
        this.model = model;
    }

    getItems = async () => {
        try {
            const arr = await this.model.find({});

            return arr;
        } catch (err) {
            console.log(err);
            logger.error(err);
        }
    };

    getItemById = async (id) => {
        let item = {};
        try {
            item = this.model.findById(id);
        } catch (err) {
            logger.error(err);
        }
        return item;
    };

    createItem = async (item) => {
        let newItem = new this.model(item);
        await newItem.save();
        return newItem;
    };

    updateItem = async (id, newItem) => {
        try {
            let product = await this.getItemById(id);
            Object.assign(product, newItem);
            await product.save();
            return product;
        } catch (err) {
            logger.error(err);
        }
    };

    deleteItem = async (id) => {
        try {
            const deleted = await this.model.deleteOne({ _id: id });
            return deleted;
        } catch (err) {
            logger.error(err);
        }
    };
}

module.exports = MongoContainer;
