(function () {
    angular.module('WebAppMaker')
        .controller('NewPageController', NewPageController);

    function NewPageController($routeParams, $location, pageService) {
        var model = this;
        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];

        model.createPage = createPage;

        function init() {
            pageService
                .findPageByWebsiteId(model.websiteId)
                .then(renderPages);
        }

        init();
        function renderPages(pages){
            model.pages = pages;
        }

// implementation
        function createPage(page) {
            if(!page.name){
                model.message = "A name is required";
                return;
            }
            page.websiteId = model.websiteId;
            console.log(page.title);
            pageService
                .createPage(page)
                .then(function () {
                    $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page');
                })
        }
    }
})();
