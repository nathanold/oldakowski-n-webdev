(function () {
    angular
        .module('NewsProject')
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'templates/api-test.html',
                controller: 'apiTestController',
                controllerAs: 'model'
            })
    }
})();