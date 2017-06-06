(function () {
    angular
        .module("WebAppMaker")
        .controller("NewWidgetController", NewWidgetController);
    function NewWidgetController($routeParams, $location, widgetService) {
        var model = this;
        function init() {
            widgetService
                .findWidgetByPageId(model.pageId)
                .then(renderWidgets);
        }

        init();
        function renderWidgets(widgets) {
            model.widgets = widgets;
        }
    }

})();
