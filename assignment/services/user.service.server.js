var app = require('../../express');
var userModel = require('../models/user/user.model.server');
app.post('/api/assignment/user', createUser);
app.get('/api/assignment/user/username/:username', findUserByUsername); //fix this!
app.get('/api/assignment/user/username/:username/password/:password', findUserByCredentials);
app.get('/api/assignment/user/:userId', findUserById);
app.put('/api/assignment/user/:userId', updateUser);
app.delete('/api/assignment/user/:userId', deleteUser);


var users = [
    {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder"},
    {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
    {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
    {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"}
];

function deleteUser(req, res) {
    var userId = req.params.userId;
    userModel
        .deleteUser(userId)
        .then(function () {
            res.sendStatus(200);
        }, function (err) {
            res.send(err);
        });
}

function updateUser(req, res) {
    var user = req.body;
    var userId = req.params.userId;
    userModel
        .updateUser(userId, user)
        .then(function (user) {
            res.json(user);
        }, function (err) {
            res.send(err);
        });

}
function findUserByCredentials(req, res) {
    var username = req.params.username;
    var password = req.params.password;
    userModel
        .findUserByCredentials(username, password)
        .then(function (user) {
            res.json(user);
        }, function (err) {
            res.send(err);
        });
}

function findUserByUsername(req, res) {
    var username = req.params.username;
    console.log('finding by username');
    console.log(username);
    userModel
        .findUserByUsername(username)
        .then(function (user) {
            res.send(user);
        }, function (err) {
            res.send(err);
        });
}

function findUserById(req, res) {
    var userId = req.params['userId'];
    userModel
        .findUserById(userId)
        .then(function (user) {
            res.json(user);
        }, function (err) {
            res.send(err);
        });
    /*var user = users.find(function (user) {
     return user._id === userId;
     });
     res.send(user);*/
}
function createUser(req, res) {
    var user = req.body;
    userModel
        .createUser(user)
        .then(function (user) {
            res.send(user);
        }, function (err) {
            res.send(err);
        });
    // user._id = (new Date()).getTime() + "";
    // users.push(user);
}