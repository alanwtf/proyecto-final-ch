const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: Number, required: true },
    email: { type: String, required: true, index: { unique: true } },
    address: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true },
    isAdmin: Boolean,
    cart_id: { type: mongoose.Schema.ObjectId },
});

const User = mongoose.model("User", UserSchema);

module.exports = { User };
