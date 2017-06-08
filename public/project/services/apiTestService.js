(function () {
    angular
        .module('NewsProject')
        .service('apiTestService', apiTestService);

    function apiTestService($http) {

        this.getNews = getNews;

        var key = "1f1174cdddac41178c1323ed7d899ddd";
        var urlBase = "https://newsapi.org/v1/articles?source=SOURCE&apiKey=API_KEY";
        function getNews(source) {
            var url = urlBase
                .replace("SOURCE", source)
                .replace("API_KEY", key);
            console.log(url);
            return $http.get(url);
        }
    }
})();