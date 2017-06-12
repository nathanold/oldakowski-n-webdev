(function () {
    angular
        .module('WebAppMaker')
        .factory('pageService', pageService);

    function pageService($http) {
        var api = {
            createPage: createPage,
            updatePage: updatePage,
            deletePage: deletePage,
            findPageById: findPageById,
            findPageByWebsiteId: findPageByWebsiteId
        };
        return api;

        function createPage(page) {
            var url = '/api/website/' + page.websiteId + '/page';
            return $http.post(url, page)
                .then(function (response) {
                    return response.data;
                });
        }

        function findPageByWebsiteId(websiteId) {
            var url = '/api/website/' + websiteId + '/page';
            console.log(url);
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findPageById(pageId) {
            var url = '/api/page/' + pageId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function updatePage(page) {
            var url = '/api/page/' + page._id;
            return $http.put(url, page)
                .then(function (response) {
                    return response.data;
                });
        }

        function deletePage(pageId) {
            var url = "api/page/" + pageId;
            console.log(url + " for deletion");
            return $http.delete(url)
                .then(function (response) {
                    console.log(response);
                    return response.data;
                });
        }

    }
})();