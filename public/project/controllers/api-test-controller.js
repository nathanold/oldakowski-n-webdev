(function () {
    angular
        .module('NewsProject')
        .controller('apiTestController', apiTestController);

    function apiTestController(apiTestService) {
        var model = this;
            apiTestService
                .getNews()
                .then(function (response) {
                    data = response;
                    model.news = data;

                });
        }

})();