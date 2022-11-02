const MongoContainer = require("../../containers/MongoContainer");

class ProductsDaoMongoDB extends MongoContainer {
    constructor(model) {
        super(model);
    }

    async getByCategory(category) {
        console.log(category);
        return await this.model.find({ category: category.category });
    }
}

module.exports = ProductsDaoMongoDB;
