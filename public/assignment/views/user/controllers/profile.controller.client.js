(function () {
    angular.module('WebAppMaker')
        .controller('profileController', profileController);

    function profileController($location, $routeParams, userService) {
        var model = this;
        var userId = $routeParams['userId'];
        function init() {
            model.user = userService.findUserById(userId);
        }
        init();
        model.updateInformation = function (user, email, firstName, lastName) {
            console.log(user);
            console.log(email + " " + firstName + " " + lastName);
            var updatedUser = {
                _id: user._id,
                username: user.username,
                password: user.password,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName
            };
            console.log(updatedUser);
            userService.updateUser(userId, updatedUser);
        };
    }

})();