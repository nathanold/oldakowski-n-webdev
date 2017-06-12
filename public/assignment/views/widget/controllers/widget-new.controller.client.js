(function () {
    angular
        .module("WebAppMaker")
        .controller("NewWidgetController", NewWidgetController);
    function NewWidgetController($routeParams, $location, widgetService) {
        var model = this;
        model.userId = $routeParams['userId'];
        model.websiteId = $routeParams['websiteId'];
        model.pageId = $routeParams['pageId'];
        function init() {
            widgetService
                .findWidgetByPageId(model.pageId)
                .then(renderWidgets);
        }

        init();
        function renderWidgets(widgets) {
            model.widgets = widgets;
        }

        model.createWidget = function (type) {
            var newWidget = {};
            newWidget.type = type + '';
            widgetService
                .createWidget(newWidget)
                .then(function (widget) {
                    console.log(JSON.stringify(widget));
                        console.log('/user/' + model.userId + '/website/' + model.websiteId + '/page/' + model.pageId + '/widget/' + widget._id);
                        $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page/' + model.pageId + '/widget/' + widget._id);
                    }
                )
        }
    }

})();
