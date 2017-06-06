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
            newWidget.widgetType = type +'';
            newWidget.pageId = model.pageId;
            newWidget._id = (new Date().getTime() + "");
            console.log(newWidget.widgetType);
            widgetService
                .createWidget(newWidget)
                .then(function () {
                    console.log('/user/' + model.userId + '/website/' + model.websiteId + '/page/' + model.pageId + '/widget/' + newWidget._id);
                        $location.url('/user/' + model.userId + '/website/' + model.websiteId + '/page/' + model.pageId + '/widget/' + newWidget._id);
                    }
                )
        }
    }

})();
