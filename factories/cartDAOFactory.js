const CartDAOMongo = require("../daos/carts/CartDaoMongoDB");
const CartDAOMemory = require("../daos/carts/CartDaoMemory");

const storageMapper = {
    MEMORY: () => new CartDAOMemory(),
    MONGO: () => new CartDAOMongo(),
};

module.exports = (storage) => {
    const storageDAOFn = storageMapper[storage] || storageMapper.MEMORY;
    const dao = storageDAOFn();
    return dao;
};
