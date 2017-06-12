(function () {
    angular
        .module('WebAppMaker')
        .factory('websiteService', websiteService);

    function websiteService($http) {

        var api = {
            createWebsite: createWebsite,
            updateWebsite: updateWebsite,
            deleteWebsite: deleteWebsite,
            findWebsiteById: findWebsiteById,
            findAllWebsitesForUser: findAllWebsitesForUser
        };
        return api;

        function createWebsite(website) {
            var url = "/api/user/" + website.developerId + "/website";
            console.log(url);
            return $http.post(url, website)
                .then(function (response) {
                    return response.data;
                });
        }

        function findAllWebsitesForUser(userId) {
            var url = "/api/assignment/user/" + userId + "/website";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                })
        }

        function findWebsiteById(websiteId) {
            var url = "/api/website/" + websiteId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function updateWebsite(website) {
            var url = '/api/website/' + website._id;
            console.log(url);

            return $http.put(url, website)
                .then(function (response) {
                    return response.data;
                });
        }

        function deleteWebsite(websiteId) {
            var url = "/api/website/" + websiteId;
            console.log('deletion url: ' + url);
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }


    }
})();

