(function() {
    angular
        .module("TestApp", [])
        .controller("TestController", TestController)
        .filter('reverse', function() {
            return function(items) {
                return items.slice().reverse();
            };
        });
    var connectionString = 'mongodb://127.0.0.1:27017/test'; // for local
    if(process.env.MLAB_USERNAME) { // check if running remotely
        var username = process.env.MLAB_USERNAME; // get from environment
        var password = process.env.MLAB_PASSWORD;
        connectionString = 'mongodb://' + username + ':' + password;
        connectionString += '@ds137141.mlab.com:37141/heroku_vj9g0c7t'; // user yours
    }

    function TestController($http) {
        var vm = this;
        vm.createMessage = createMessage;
        vm.deleteMessage = deleteMessage;

        function init() {
            findAllMessages();
        }
        init();

        function createMessage(message) {
            vm.message = "";
            var obj = {
                message: message
            };
            $http.post("/api/test", obj)
                .then(
                    findAllMessages,
                    function(err) {
                        vm.error = err;
                    }
                );
        }

        function deleteMessage(message) {
            $http.delete("/api/test/" + message._id)
                .then(
                    findAllMessages,
                    function(err) {
                        vm.error = err;
                    }
                );
        }

        function findAllMessages() {
            $http.get("/api/test")
                .then(
                    function(response) {
                        vm.messages = response.data;
                    },
                    function(err) {
                        vm.error = err;
                    }
                );
        }
    }
})();