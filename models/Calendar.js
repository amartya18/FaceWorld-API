const mongoose = require('mongoose');

const CalendarSchema = mongoose.Schema({
    title: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now()
    },
});

module.exports = mongoose.model('Calendar', CalendarSchema);