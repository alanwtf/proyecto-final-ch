const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
    {
        products: [
            {
                productId: { type: mongoose.Schema.ObjectId, required: true },
                quantity: { type: Number, required: true },
                _id: false,
            },
        ],
        user_id: { type: mongoose.Schema.ObjectId, required: true },
    },
    { timestamps: true }
);

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
