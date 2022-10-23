const ProductDAOMongo = require("../daos/products/ProductsDaoMongo");
const ProductDAOMemory = require("../daos/products/ProductsDaoMemory");

const storageMapper = {
    MEMORY: () => new ProductDAOMemory(),
    MONGO: () => new ProductDAOMongo(),
};

module.exports = (storage) => {
    console.log(storage);
    const storageDAOFn = storageMapper[storage] || storageMapper.MEMORY;
    const dao = storageDAOFn();
    return dao;
};
