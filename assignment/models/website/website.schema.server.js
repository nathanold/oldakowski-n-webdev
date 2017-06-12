var mongoose = require('mongoose');

var websiteSchema = mongoose.Schema({
    _user: {type: mongoose.Schema.ObjectId, ref: "UserModel"},
    name: String,
    description: String,
    dateCreated: {type: Date, default: Date.now},
    pages: [{type: mongoose.Schema.ObjectId, ref: "PageModel"}]
}, {collection: 'website'});

module.exports = websiteSchema;