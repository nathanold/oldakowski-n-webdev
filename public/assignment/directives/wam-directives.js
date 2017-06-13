(function () {
    angular
        .module('wamDirectives', [])
        .directive('wam-sortable', wamSortable);

    function wamSortable() {

        function linkFunction(scope, element) {
            $(element).sortable();
        }

        return {
            link: linkFunction
        }
    }
})();