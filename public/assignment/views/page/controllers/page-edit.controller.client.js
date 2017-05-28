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
            model.pages = pageService.findPageByWebsiteId(model.websiteId);
            model.page = pageService.findPageById(model.pageId);
        }

        init();

        model.deletePage = function (pageId) {
            pageService.deletePage(pageId);
            $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page');
        };
        model.updatePage = function(pageId, page){
            console.log("begin");
            pageService.updatePage(pageId, page);
            $location.url('/user/' + model.userId + '/website/'+model.websiteId+'/page');
        };
    }
})();
