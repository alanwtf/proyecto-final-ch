const MongoContainer = require("../../containers/MongoContainer");

class OrderDaoMongoDB extends MongoContainer {
    constructor(model) {
        super(model);
    }
}

module.exports = OrderDaoMongoDB;
