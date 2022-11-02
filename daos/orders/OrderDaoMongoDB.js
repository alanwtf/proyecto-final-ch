const MongoContainer = require("../../containers/MongoContainer");

class OrderDaoMongoDB extends MongoContainer {
    constructor(model) {
        super(model);
    }

    async getCount() {
        return await this.model.countDocuments();
    }
}

module.exports = OrderDaoMongoDB;
