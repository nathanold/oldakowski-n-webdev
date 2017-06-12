var app = require('../../express');
var widgetModel = require('../models/widget/widget.model.server');

var multer = require('multer'); // npm install multer --save
var upload = multer({dest: __dirname + '/../../public/assignment/uploads'});

app.post("/api/assignment/upload", upload.single('myFile'), uploadImage);

app.post('/api/page/:pageId/widget', createWidget);
app.get('/api/page/:pageId/widget', findAllWidgetsForPage);
app.get('/api/widget/:widgetId', findWidgetById);
app.put('/api/widget/:widgetId', updateWidget);
app.delete('/api/widget/:widgetId', deleteWidget);

var widgets = [
    {"_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
    {"_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    {
        "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
        "url": "http://lorempixel.com/400/200/"
    },
    {"_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
    {"_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
    {
        "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
        "url": "https://youtu.be/AM2Ivdi9c4E"
    },
    {"_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
];

function createWidget(req, res) {
    var widget = req.body;
    console.log('widgetType: ' + widget.widgetType);
    //var pageId = req.params.pageId;
    //widget._page = pageId;

    console.log('creating');
    console.log(JSON.stringify(widget));
    widgetModel
        .createWidget(widget)
        .then(function (widget) {
            console.log('returning!');
            console.log(JSON.stringify(widget));
            res.json(widget);
        }, function (err) {
            console.log('there is an error');
            console.log(err);
            res.send(err);
        });
}

function findAllWidgetsForPage(req, res) {
    var pageId = req.params.pageId;
    console.log("Finding widgetIDs for page: " + pageId);

    widgetModel
        .findAllWidgetsForPage(pageId)
        .then(function (widgets) {
            res.json(widgets);
        });
}

function findWidgetById(req, res) {
    var widgetId = req.params.widgetId;
    console.log("Finding widgetID: " + widgetId);
    widgetModel
        .findWidgetById(widgetId)
        .then(function (widget) {
            res.json(widget);
        });
}


function updateWidget(req, res) {
    var widget = req.body;
    var widgetId = req.params.widgetId;
    widgetModel
        .updateWidget(widgetId, widget)
        .then(function (widget) {
            res.json(widget);
        }, function (err) {
            res.send(err);
        });
}

function deleteWidget(req, res) {
    var widgetId = req.params.widgetId;
    console.log('deleting ' + widgetId);
    widgetModel
        .deleteWidget(widgetId)
        .then(function () {
            res.sendStatus(200);
        }, function (err) {
            res.send(err);
        });
}


function uploadImage(req, res) {
    var widgetId = req.body.widgetId;
    var userId = req.body.userId;
    var pageId = req.body.pageId;
    var websiteId = req.body.websiteId;


    console.log('widgetId upd: ' + widgetId);
    var width = req.body.width;
    var myFile = req.file;

    var originalname = myFile.originalname; // file name on user's computer
    var filename = myFile.filename;     // new file name in upload folder
    var path = myFile.path;         // full path of uploaded file
    var destination = myFile.destination;  // folder where file is saved to
    var size = myFile.size;
    var mimetype = myFile.mimetype;

    console.log(myFile);
    var widgetUpdated = widgetModel.findWidgetById(widgetId);
    console.log(widgetUpdated);
    widgetUpdated.url = '/assignment/uploads/' + filename;
    widgetModel
        .updateWidget(widgetId, widgetUpdated);
    var callbackUrl = "/assignment/#!/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/";
    console.log(callbackUrl);
    res.redirect(callbackUrl);
}
