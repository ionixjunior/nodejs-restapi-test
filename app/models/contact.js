var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var ContactSchema = new Schema({
    first_name: String,
    last_name: String,
    email: { type: String, lowercase: true, trim: true },
    created_at: { type: Date, default: Date.now },
    birthday: Date
});

module.exports = mongoose.model('contacts', ContactSchema);
