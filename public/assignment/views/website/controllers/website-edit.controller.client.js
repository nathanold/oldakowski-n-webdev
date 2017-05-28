(function () {
    angular.module('WebAppMaker')
        .controller('websiteEditController', websiteEditController);

    function websiteEditController($routeParams, $location, websiteService) {
        var model = this;
        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];
        function init() {
            model.websites = websiteService.findAllWebsitesForUser(model.userId);
            model.website = websiteService.findWebsiteById(model.websiteId);
        }

        init();

        model.deleteWebsite = function(websiteId){
            websiteService.deleteWebsite(websiteId);
            $location.url('/user/' + model.userId + '/website');
        };

        model.updateWebsite = function(websiteId, website){
            websiteService.updateWebsite(websiteId, website);
            $location.url('/user/' + model.userId + '/website');
        };
    }
})();