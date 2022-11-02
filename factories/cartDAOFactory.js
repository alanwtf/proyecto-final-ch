const CartDAOMongoDB = require("../daos/carts/CartDaoMongoDB");
const CartDAOMemory = require("../daos/carts/CartDaoMemory");
const Cart = require("../models/Cart");

const storageMapper = {
    MEMORY: () => new CartDAOMemory(),
    MONGO: () => new CartDAOMongoDB(Cart),
};

module.exports = (storage) => {
    const storageDAOFn = storageMapper[storage] || storageMapper.MONGO;
    const dao = storageDAOFn();
    return dao;
};
