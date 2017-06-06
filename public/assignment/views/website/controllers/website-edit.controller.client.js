(function () {
    angular.module('WebAppMaker')
        .controller('websiteEditController', websiteEditController);

    function websiteEditController($routeParams, $location, websiteService) {
        var model = this;
        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];
        function init() {
            websiteService
                .findAllWebsitesForUser(model.userId)
                .then(renderWebsites);
            websiteService
                .findWebsiteById(model.websiteId)
                .then(renderWebsite);
        }

        init();
        function renderWebsites(websites) {
            model.websites = websites;
        }

        function renderWebsite(website) {
            model.website = website;
        }

        model.deleteWebsite = function (websiteId) {
            websiteService
                .deleteWebsite(model.websiteId)
                .then(function () {
                    $location.url('/user/' + model.userId + '/website');
                })
        };

        model.updateWebsite = function (website) {
            console.log('updating ' + website._id);
            websiteService
                .updateWebsite(website)
                .then(function () {
                    $location.url('/user/' + model.userId + '/website');
                })
        };
    }
})();