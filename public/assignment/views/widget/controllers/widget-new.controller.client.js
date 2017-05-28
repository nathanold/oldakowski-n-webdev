(function () {
    angular
        .module("WebAppMaker")
        .controller("NewWidgetController", NewWidgetController);
    function NewWidgetController() {
        var model = this;

        function init() {
            model.widgets = widgetService.findWidgetByPageId(model.pageId);
        }
    }

})();
