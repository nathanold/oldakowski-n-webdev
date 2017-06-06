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
            widgetService
                .findWidgetByPageId(model.pageId)
                .then(renderWidgets);
            widgetService
                .findWidgetById(model.widgetId)
                .then(renderWidget);
        }

        init();

        function renderWidgets(widgets){
            model.widgets = widgets;
        }
        function renderWidget(widget){
            model.widget = widget;
        }

        model.deleteWidget = function (widgetId) {
            widgetService
                .deleteWidget(model.widgetId)
                .then(function () {
                    $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page/' + model.pageId +'/widget');
                })
        };

        model.updateWidget = function (widget) {
            widgetService
                .updateWidget(widget)
                .then(function () {
                    $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page/' + model.pageId +'/widget');
                })
        };
    }

})();
