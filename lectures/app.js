module.exports = function (app) {
    var tuhdoos = [
        {title: "tuhdoo 1", details: 'wow1'},
        {title: "tuhdoo 2", details: 'wow1'},
        {title: "tuhdoo 3", details: 'wow2'},
        {title: "tuhdoo 4", details: 'wow3'},
        {title: "tuhdoo 5", details: 'wow4'}

    ];
    app.delete('/api/tuhdoo/:index',function(req,res){
        tuhdoos.splice(req.params.index, 1);
        res.json(tuhdoos); //send back remainding tuhdoos
    });
    app.get('/api/tuhdoo', function (req, res) {
            res.json(tuhdoos);
        }
    );
    app.get('/api/tuhdoo/:index', function (req, res) {
        var index = req.params['index'];
            res.json(tuhdoos[index]);
        }
    );
};
/*{
 message: 'hello'
 sayHello: function(){
 console.log("hey there");}};
 */
console.log("I'm here on the server side!");
// this file is fundamentally different from the other app.js
// that one runs on the browser, this one runs here on the server.
// it's just us!

// you need to make functions exposed if you want to use them in other places