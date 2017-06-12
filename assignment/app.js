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

function sayHello(req,res){
    res.send('hey there');
}
