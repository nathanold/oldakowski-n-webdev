(function () {
    angular
        .module('WebAppMaker')
        .factory('userService', userService);

    function userService($http) {
        var api = {
            createUser: createUser,
            updateUser: updateUser,
            deleteUser: deleteUser,
            findUserById: findUserById,
            findUserByCredentials: findUserByCredentials,
            findUserByUsername: findUserByUsername
        };
        return api;

        function createUser(user) {
            var url = "/api/assignment/user";
            return $http.post(url, user)
                .then(function (response) {
                    return response.data;
                });
        }

        function updateUser(user) {
            var url = "/api/assignment/user/" + user._id;
            console.log(url);
            return $http.put(url, user)
                .then(function (response) {
                    return response.data;
                });
        }

        function deleteUser(userId) {
            var url = "/api/assignment/user/" + userId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findUserByUsername(username) {
            var url = '/api/assignment/user/username/' + username;
            console.log(url);
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findUserById(userId) {
            var url = "/api/assignment/user/" + userId ;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findUserByCredentials(username, password) {
            var url = "/api/assignment/user/username/" + username + "/password/" + password;
            console.log(url);
            return $http.get(url)
                .then(function (response) {
                    console.log('response:' + response.data);
                    return response.data;
                });
        }

    }
})();