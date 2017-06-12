var mongoose = require('mongoose');

var widgetSchema = require('./widget.schema.server');
var widgetModel = mongoose.model('WidgetModel', widgetSchema);

widgetModel.createWidget = createWidget;
widgetModel.findAllWidgetsForPage = findAllWidgetsForPage;
widgetModel.findWidgetById = findWidgetById;
widgetModel.updateWidget = updateWidget;
widgetModel.deleteWidget = deleteWidget;
//widgetModel.reorderWidget = reorderWidget;

module.exports = widgetModel;
function createWidget(widget) {
    console.log("Creating widget from widget model " + JSON.stringify(widget));
    return widgetModel.create(widget);
}

function findWidgetById(widgetId) {
    console.log('finding widget by id: '+ widgetId);
    return widgetModel.findById(widgetId);
}

function findAllWidgetsForPage(pageId) {
    return widgetModel
        .find({_page: pageId})
        .populate('_page', '_id')
        .exec();}

function updateWidget(widgetId, newWidget) {
    return widgetModel.update({_id: widgetId}, {$set: newWidget});
}

function deleteWidget(widgetId) {
    console.log('widget id for deletion: '+ widgetId);
    return widgetModel.remove({_id: widgetId});
}