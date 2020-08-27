const mongoose = require('mongoose');

const vendorSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    },
    mobile: {
        type: Number,
        required: true,
        unique: true,
        match: /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$ ^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g
    },
    password: { type: String, required: true }

});

module.exports = mongoose.model('Vendor', vendorSchema);

