var app = require('../../express');

app.post('/api/user/:userId/website', createWebsite);
app.get('/api/assignment/user/:userId/website', findAllWebsitesForUser);
app.get('/api/website/:websiteId', findWebsiteById);
app.put('/api/website/:websiteId', updateWebsite);
app.delete('/api/website/:websiteId', deleteWebsite);

var websites = [
    {"_id": "123", "name": "Facebook", "developerId": "456", "description": "Lorem"},
    {"_id": "234", "name": "Tweeter", "developerId": "456", "description": "Lorem"},
    {"_id": "456", "name": "Gizmodo", "developerId": "456", "description": "Lorem"},
    {"_id": "890", "name": "Go", "developerId": "123", "description": "Lorem"},
    {"_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem"},
    {"_id": "678", "name": "Checkers", "developerId": "123", "description": "Lorem"},
    {"_id": "789", "name": "Chess", "developerId": "234", "description": "Lorem"}
];

function createWebsite(req, res) {
    var website = req.body;
    console.log(website.title);
    website._id = (new Date().getTime() + "");
    websites.push(website);
    res.send(website);
    console.log("Website Created");
}

function findAllWebsitesForUser(req, res) {
    var userId = req.params['userId'];
    var resultSet = [];
    for (var w in websites) {
        if (websites[w].developerId === userId) {
            resultSet.push(websites[w]);
        }
    }
    res.json(resultSet);
}

function findWebsiteById(req, res) {
    var websiteId = req.params['websiteId'];
    var website = websites.find(function (website) {
        return website._id === websiteId;
    });
    res.send(website);
}

function updateWebsite(req,res){
    var website = req.body;
    var websiteId = req.params.websiteId;
    console.log('updating '+websiteId);
    for (var w in websites) {
        if (websiteId === websites[w]._id) {
            websites[w] = website;
            res.sendStatus(200);
            return;
        }
    }
    res.sendStatus(404);
}

function deleteWebsite(req,res){
    var websiteId = req.params.websiteId;
    var website = websites.find(function (website) {
        return website._id === websiteId;
    });
    var index = websites.indexOf(website);
    websites.splice(index, 1);
    res.sendStatus(200);
}