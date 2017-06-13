console.log("SERVER SIDE!");
var app = require('../express'); // creates an instance of the express lib
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/webdev_noldakowski');
mongoose.Promise = require('q').Promise;
require('./services/user.service.server');
require('./services/page.service.server');
require('./services/website.service.server');
require('./services/widget.service.server');
app.get('/hello', sayHello);
var connectionString = 'mongodb://127.0.0.1:27017/test';

if (process.env.MLAB_USERNAME) {
    connectionString = process.env.MLAB_USERNAME + ":" +
        process.env.MLAB_PASSWORD + "@" +
        process.env.MLAB_HOST + ':' +
        process.env.MLAB_PORT + '/' +
        process.env.MLAB_APP_NAME;
}

var connectionString = 'mongodb://127.0.0.1:27017/test'; // for local
if (process.env.MLAB_USERNAME) { // check if running remotely
    var username = process.env.MLAB_USERNAME; // get from environment
    var password = process.env.MLAB_PASSWORD;
    connectionString = 'mongodb://' + username + ':' + password;
    connectionString += '@ds137141.mlab.com:37141/heroku_vj9g0c7t'; // user yours
}
function sayHello(req, res) {
    res.send('hey there');
}
