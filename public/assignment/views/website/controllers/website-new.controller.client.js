(function () {
    angular.module('WebAppMaker')
        .controller('websiteNewController', websiteNewController);

    function websiteNewController($routeParams, $location, websiteService) {
        var model = this;
        model.userId = $routeParams['userId'];
        console.log("USER ID: " + model.userId);
        model.createWebsite = createWebsite;

        function init() {
            websiteService
                .findAllWebsitesForUser(model.userId)
                .then(renderWebsites);
        }

        init();
        function renderWebsites(websites) {
            model.websites = websites;
        }

        function createWebsite(website) {
            if(!website.name){
                model.message = "A name is required";
                return;
            }
            website.developerId = model.userId;
            console.log(website.name);
            websiteService
                .createWebsite(website)
                .then(function () {
                    $location.url('/user/' + model.userId + '/website');
                });
        }
    }
})();