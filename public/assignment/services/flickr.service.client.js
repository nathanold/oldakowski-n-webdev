(function () {
    angular
        .module('WebAppMaker')
        .factory('flickrService', flickrService);

    function websiteService() {
        var websites = [
            {"_id": "123", "name": "Facebook", "developerId": "456", "description": "Lorem"},
            {"_id": "234", "name": "Tweeter", "developerId": "456", "description": "Lorem"},
            {"_id": "456", "name": "Gizmodo", "developerId": "456", "description": "Lorem"},
            {"_id": "890", "name": "Go", "developerId": "123", "description": "Lorem"},
            {"_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem"},
            {"_id": "678", "name": "Checkers", "developerId": "123", "description": "Lorem"},
            {"_id": "789", "name": "Chess", "developerId": "234", "description": "Lorem"}
        ];


        var api = {
            createWebsite: createWebsite,
            updateWebsite: updateWebsite,
            deleteWebsite: deleteWebsite,
            findWebsiteById: findWebsiteById,
            findAllWebsitesForUser: findAllWebsitesForUser
        };
        return api;

        function findAllWebsitesForUser(userId) {
            /*var resultSet = [];
             for (var w in websites) {
             if (websites[w].developerId === userId) {
             // websites[w].created = new Date();
             // websites[w].updated = new Date();
             resultSet.push(websites[w]);
             }
             }
             return resultSet;
             */
            var url = "/api/assignment/user/" + userId + "/website";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })
        }

        function createWebsite(website) {
            website._id = (new Date().getTime() + "");
            websites.push(website);
            console.log("Website Created");
            console.log(websites);
        }

        function updateWebsite(websiteId, website) {
            deleteWebsite(websiteId);
            websites.push(website);
            console.log(websites);
        }

        function deleteWebsite(websiteId) {
            var website = websites.find(function (website) {
                return website._id === websiteId;
            });
            var index = websites.indexOf(website);
            websites.splice(index, 1);
            console.log("Deleting " + website);
        }

        function findWebsiteByUser(userId) {
            var website = websites.find(function (website) {
                return website.developerId === userId;
            });
            if (typeof website === 'undefined') {
                return null;
            }
            else
                return website;
        }

        function findWebsiteById(websiteId) {
            for (var w in websites) {
                return websites.find(function (website) {
                    return website._id === websiteId;
                });
            }
        }

    }
})();

