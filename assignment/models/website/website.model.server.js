var mongoose = require('mongoose');

var websiteSchema = require('./website.schema.server');
var websiteModel = mongoose.model('WebsiteModel', websiteSchema);

websiteModel.createWebsite = createWebsite;
websiteModel.findAllWebsitesForUser = findAllWebsitesForUser;
websiteModel.findWebsiteById = findWebsiteById;
websiteModel.updateWebsite = updateWebsite;
websiteModel.deleteWebsite = deleteWebsite;

module.exports = websiteModel;
function createWebsite(website) {
    return websiteModel.create(website);
}

function findWebsiteById(websiteId) {
    return websiteModel.findById(websiteId);
}

function findAllWebsitesForUser(userId) {
    return websiteModel
        .find({_user: userId})
        .populate('_user', 'username')
        .exec();}

function updateWebsite(websiteId, newWebsite) {
    return websiteModel.update({_id: websiteId}, {$set: newWebsite});
}

function deleteWebsite(websiteId) {
    return websiteModel.remove({_id: websiteId});
}