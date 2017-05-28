(function() {
    angular
        .module("WebAppMaker")
        .controller("EditWidgetController", EditWidgetController);
    function EditWidgetController($routeParams, $location, widgetService) {
        var model = this;
        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];
        model.pageId = $routeParams['pageId'];
        model.widgetId = $routeParams['widgetId'];
        function init() {
            model.widgets = widgetService.findWidgetByPageId(model.pageId);
            model.widget = widgetService.findWidgetById(model.widgetId);
        }

        init();

    }

})();
