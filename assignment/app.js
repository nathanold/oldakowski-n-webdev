console.log("SERVER SIDE!");
var app = require('../express'); // creates an instance of the express lib

require('./services/user.service.server');
require('./services/page.service.server');
require('./services/website.service.server');
require('./services/widget.service.server');
app.get('/hello', sayHello);
app.get('/websites', sendWebsites);
/*
var port = process.env.PORT || 6500;
app.listen(port);
*/
function sendWebsites(req,res){
    var websites=[
        {name: 'facebook'},
        {name: 'twitter'},
        {name: 'linkedin'}
    ];
    res.send(websites);
}

function sayHello(req,res){
    res.send('hey there');
}
