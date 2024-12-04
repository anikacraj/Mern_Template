const mongoose = require('mongoose');

const usersRegister = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true }, // Unique constraint
    password: { type: String, required: true },
    signInDate: { type: Date, default: Date.now }
});

const usersRegisterModal = mongoose.model("usersRegister", usersRegister);
module.exports = usersRegisterModal;

