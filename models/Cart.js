const mongoose = require("mongoose");

const cartProd = new mongoose.Schema(
    {
        productId: { type: String, required: true },
        quantity: { type: Number },
    },
    { _id: false }
);

const cartSchema = new mongoose.Schema(
    {
        products: [cartProd],
        user_id: { type: mongoose.Schema.ObjectId, required: true },
    },
    { timestamps: true }
);

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
