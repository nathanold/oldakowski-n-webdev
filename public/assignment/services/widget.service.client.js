(function () {
    angular
        .module('WebAppMaker')
        .factory('widgetService', widgetService);

    function widgetService($http) {

        var api = {
            createWidget: createWidget,
            updateWidget: updateWidget,
            deleteWidget: deleteWidget,
            findWidgetById: findWidgetById,
            findWidgetByPageId: findWidgetByPageId
        };
        return api;

        function createWidget(widget) {
            console.log("WIDGET: " + widget.widgetType);
           var url = '/api/page/'+widget.pageId+'/widget';
            return $http.post(url, widget)
                .then(function (response) {
                    return response.data;
                });
        }

        function updateWidget(widget) {
            var url = '/api/widget/'+widget._id;
            console.log(url);
            return $http.put(url, widget)
                .then(function (response) {
                    return response.data;
                });
        }

        function deleteWidget(widgetId) {
            var url = '/api/widget/'+widgetId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findWidgetByPageId(pageId) {
            var url = '/api/page/'+ pageId +'/widget';
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findWidgetById(widgetId) {
            var url = '/api/widget/'+widgetId;

            return $http.get(url)
                .then(function (response) {
                    console.log(response.data);
                    return response.data;
                });
        }
    }
})();