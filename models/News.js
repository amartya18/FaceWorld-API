const mongoose = require('mongoose');

const NewsSchema = mongoose.Schema({
    title: {
        type: String,
    },
    url: {
        type: String,
    },
    selected: {
        type: Boolean,
        required: false,
        default: false
    },

});

module.exports = mongoose.model('News', NewsSchema);