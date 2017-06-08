(function () {
    angular
        .module('NewsProject')
        .controller('loginController', loginController);

    function loginController($location, userService) {

        var model = this;

        model.login = function (username, password) {
            console.log('trying to find: '+username +" "+ password);
            userService
                .findUserByCredentials(username, password)
                .then(login, handleError);
            function handleError(error) {
                console.log('error');
                model.message = "Username " + username + " not found, please try again";
            }

            function login(found) {
                if (found !== null) {
                    console.log('found user');
                    $location.url('/user/' + found._id);
                } else {
                    console.log('user not found');
                    model.message = "Username " + username + " not found, please try again";
                }
            }

        };
    }
})();