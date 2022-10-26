const logger = require("../config/winston");

class MongoContainer {
    constructor(model) {
        this.model = model;
    }

    getItems = async () => {
        let arr = [];
        try {
            arr = await this.model.find({});

            return arr;
        } catch (err) {
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
        console.log(newItem);

        await newItem.save();
        return newItem;
    };

    updateItem = async (id, newItem) => {
        try {
            console.log({ id, newItem });
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
            console.log(id);
            const deleted = await this.model.deleteOne({ _id: id });
            console.log(deleted);
            return deleted;
        } catch (err) {
            logger.error(err);
        }
    };
}

module.exports = MongoContainer;
