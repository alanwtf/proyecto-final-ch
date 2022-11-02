const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        photo_url: { type: String, required: true },
        category: { type: String, reuired: true },
        price: { type: Number, required: true },
    },
    { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

module.exports = { Product, productSchema };
