const ProductDAOMongo = require("../daos/products/ProductsDaoMongo");
const ProductDAOMemory = require("../daos/products/ProductsDaoMemory");
const { Product } = require("../models/Product");

const storageMapper = {
    MEMORY: () => new ProductDAOMemory(),
    MONGO: () => new ProductDAOMongo(Product),
};

module.exports = (storage) => {
    const storageDAOFn = storageMapper[storage] || storageMapper.MEMORY;
    const dao = storageDAOFn();
    return dao;
};
