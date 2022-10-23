class ProductDTO {
    constructor(product) {
        this.title = product.title;
        this.description = product.description;
        this.photo_url = product.photo_url;
        this.price = product.price;
        this.code = product.code;
        this.stock = product.stock;
        this.id = product._id || product.id;
    }
}

module.exports = ProductDTO;
