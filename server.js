var express = require('express'); // creates an instance of the express lib
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// configure a public directory to host static content
app.use(express.static(__dirname + '/public')); //anything under the public directory will
                                                // be static and send it verbatim; slash is now public/

require ("./test/app.js")(app);

var port = process.env.PORT || 3000;

var myApp = require('./lectures/app'); //.js is optional
myApp(app);
console.log(myApp);
app.listen(port);