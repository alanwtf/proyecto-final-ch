const logger = require("../config/winston");

class MongoContainer {
    constructor(model) {
        this.model = model;
    }

    getItems = async () => {
        let arr = [];
        try {
            //console.log(model);
            arr = await this.model.find({});
        } catch (err) {
            logger.error(err);
        }
        return arr;
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
            const deleted = await this.model.deleteOne({ _id: id });
            return deleted;
        } catch (err) {
            logger.error(err);
        }
    };
}

module.exports = MongoContainer;
