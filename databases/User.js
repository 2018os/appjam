const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    id: { type: String, required: true, unique: true },
    pw: { type: String, required: true },
    name: { type: String, required: true },
    isSenior: { type: Boolean, required: true },
    tag: { type: [String], required: true }
});

module.exports = mongoose.model('user', userSchema);