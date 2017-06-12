var mongoose = require('mongoose');

var pageSchema = require('./page.schema.server');
var pageModel = mongoose.model('PageModel', pageSchema);

pageModel.createPage = createPage;
pageModel.findAllPagesForWebsite = findAllPagesForWebsite;
pageModel.findPageById = findPageById;
pageModel.updatePage = updatePage;
pageModel.deletePage = deletePage;

module.exports = pageModel;

function createPage(page) {
    console.log('creating server page');
    console.log(page);
    return pageModel.create(page);
}

function findPageById(pageId) {
    return pageModel.findById(pageId);
}

function findAllPagesForWebsite(websiteId) {
    return pageModel
        .find({_website: websiteId})
        .populate('_website', 'website')
        .exec();}

function updatePage(pageId, newPage) {
    return pageModel.update({_id: pageId}, {$set: newPage});
}

function deletePage(pageId) {
    console.log('page id for deletion: '+ pageId);
    return pageModel.remove({_id: pageId});
}