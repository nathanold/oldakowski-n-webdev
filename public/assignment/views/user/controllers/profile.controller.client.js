(function () {
    angular.module('WebAppMaker')
        .controller('profileController', profileController);

    function profileController(currentUser, $location, userService, $routeParams) {

        var model = this;
        var userId = currentUser._id;
        model.user = currentUser;
        console.log(model.user);
        model.updateUser = updateUser;
        model.deleteUser = deleteUser;
        model.logout = logout;

        /*userService
         .findUserById(userId)
         .then(renderUser);
         */

        function init() {
            //  renderUser(currentUser)
        }

        init();
        //  function renderUser (user) {
        //      model.user = user;
        //  }
        function logout() {
            userService
                .logout()
                .then(function () {
                    $location.url('/login');
                });

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
            console.log("controller user: " + user);
            userService
                .updateUser(user)
                .then(function () {
                    model.message = "User updated successfully";
                });
        }
    }
})();