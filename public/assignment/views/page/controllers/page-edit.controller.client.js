/*(function () {
 angular
 .module("WebAppMaker")
 .controller("EditPageController", EditPageController);
 function EditPageController($routeParams, $location, pageService) {
 var model = this;
 model.userId = $routeParams['userId'];
 model.websiteId = $routeParams['websiteId'];
 model.pageId = $routeParams['pageId'];
 function init() {
 model.page = pageService.findPageById(model.pageId);
 }

 init();
 model.deleteWebsite = function (websiteId) {
 websiteService.deleteWebsite(websiteId);
 $location.url('/user/' + model.userId + '/website');
 }
 }

 })();
 */
(function () {
    angular.module('WebAppMaker')
        .controller('EditPageController', EditPageController);

    function EditPageController($routeParams, $location, pageService) {
        var model = this;
        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];
        model.pageId = $routeParams['pageId'];
        function init() {
            pageService
                .findPageByWebsiteId(model.websiteId)
                .then(renderPages);

            pageService
                .findPageById(model.pageId)
                .then(renderPage);
        }

        init();
        function renderPage(page) {
            model.page = page;
        }

        function renderPages(pages) {
            model.pages = pages;
        }

        model.deletePage = function (pageId) {
            console.log('deleting page ' + pageId);
            pageService
                .deletePage(pageId)
                .then(function () {
                    $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page')
                });
        };
        model.updatePage = function (page) {
            pageService
                .updatePage(page)
                .then(function () {
                    $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page')
                });
        };
    }

})();
