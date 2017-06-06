var mongoose = require('mongoose');
mongoose.Promise = require('q').Promise;
mongoose.connect('mongodb://localhost/webdev_noldakowski');

todoSchema = mongoose.Schema({
    title: String,
    dueDate: Date
}, {collection: 'todo'});

todoModel = mongoose.model('TodoModel', todoSchema);

var todo1 = {
    title: 'pick up toilet paper',
    dueDate: new Date()
};
/*
todoModel.create(todo1, function (err, doc) {
    if (err) {
        console.log('error: ' + err);
    }
    else {
        console.log(doc);
    }
});
*/
findAllTodos()
    .then(function(todos){
        console.log(todos);
    });
todoModel.find()
    .then(function(docs){
        console.log(docs);
    });
//you can also use promises:
todoModel
    .create(todo1)
    .then(function (doc) {
console.log(doc);
    }, function (err) {
console.log(err);
    });
