const mongoose = require('mongoose');

const itemSchema = mongoose.Schema({
    Title: {type: String, required: true},
    Description: {type: String, required: true},
    Price: {type: Number, required: true}
});

module.exports = mongoose.model('Item', itemSchema);

