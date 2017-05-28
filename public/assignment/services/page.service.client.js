(function () {
    angular
        .module('WebAppMaker')
        .factory('pageService', pageService);

    function pageService() {
        var pages = [
                {"_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem"},
                {"_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem"},
                {"_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem"}
            ]
            ;
        var api = {
            createPage: createPage,
            updatePage: updatePage,
            deletePage: deletePage,
            findPageById: findPageById,
            findPageByWebsiteId: findPageByWebsiteId
        };
        return api;

        function createPage(page) {
            console.log("CREATING");
            page._id = (new Date().getTime() + "");
            console.log("creating "+page);
            pages.push(page);
        }

        function updatePage(pageId, page) {
            deletePage(pageId);
            pages.push(page);
        }

        function deletePage(pageId) {
            console.log("deleting");
            var page = pages.find(function (page) {
                return page._id === pageId;
            });
            var index = pages.indexOf(page);
            pages.splice(index, 1);
        }

        function findPageByWebsiteId(websiteId) {
            var resultSet = [];
            for (var p in pages) {
                if (pages[p].websiteId === websiteId) {
                    resultSet.push(pages[p]);
                }
            }
            return resultSet;
        }

        function findPageById(pageId) {
            for (var p in pages) {
                return pages.find(function (page) {
                    return page._id === pageId;
                });
            }
        }
    }
})();