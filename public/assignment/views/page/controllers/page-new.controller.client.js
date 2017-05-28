/*(function () {
    angular
        .module("WebAppMaker")
        .controller("NewPageController", NewPageController);
    function NewPageController($routeParams, pageService) {
        var model = this;
        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];

        model.createPage = createPage;

        function init() {
            model.pages = pageService.findPageByWebsiteId(model.websiteId);
        }

        init();
        function createPage(page) {
            console.log("adding page");
            page.websiteId = model.websiteId;
            pageService.createPage(page);
            $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page');
        }
    }
})();
*/
(function () {
    angular.module('WebAppMaker')
        .controller('NewPageController', NewPageController);

    function NewPageController($routeParams, $location, pageService) {
        var model = this;
        model.userId = $routeParams['userId'];
        console.log("USER ID: " + model.userId);
        model.websiteId = $routeParams['websiteId'];

        model.createPage = createPage;

        function init() {
            model.pages = pageService.findPageByWebsiteId(model.websiteId);
        }

        init();

// implementation
        function createPage(page) {
            page.websiteId = model.websiteId;
            pageService.createPage(page);
            $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page');
        }
    }
})();
