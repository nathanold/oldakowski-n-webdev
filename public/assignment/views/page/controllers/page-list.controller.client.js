(function () {
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController);
    function PageListController($routeParams, pageService) {

        var model = this;
        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];

        function init() {
            console.log(model.websiteId);
            pageService
                .findPageByWebsiteId(model.websiteId)
                .then(renderPages);
        }
        init();
        function renderPages(pages) {
            model.pages = pages;
        }

    }

})();
