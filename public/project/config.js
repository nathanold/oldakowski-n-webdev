(function () {
    angular
        .module('NewsProject')
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when('/apiTest', {
                templateUrl: 'templates/api-test.html',
                controller: 'apiTestController',
                controllerAs: 'model'
            })
            .when('/login', {
                templateUrl: './templates/login.html',
                controller: 'loginController',
                controllerAs: 'model'
            })
            .when('/register', {
                templateUrl: './templates/register.html',
                controller: 'registerController',
                controllerAs: 'model'
            })
    }
})();