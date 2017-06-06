(function () {
    angular.module('WebAppMaker')
        .controller('profileController', profileController);

    function profileController($location, userService, $routeParams) {

        var model = this;
        var userId = $routeParams['userId'];
        model.updateUser = updateUser;
        model.deleteUser = deleteUser;

        userService
            .findUserById(userId)
            .then(renderUser);

        function renderUser (user) {
            model.user = user;
        }

        function deleteUser(user) {
            console.log(user.username);
            userService
                .deleteUser(user._id)
                .then(function () {
                    $location.url('/login');
                });
        }

        function updateUser(user) {
            console.log("controller user: "+user);
            userService
                .updateUser(user)
                .then(function () {
                    model.message = "User updated successfully";
                });
        }
    }
})();