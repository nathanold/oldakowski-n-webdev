(function () {
    angular
        .module("tuhdooApp", [])     //all of these dots are 'chained'
        .controller("tuhdooListController", tuhdooListController);

    function tuhdooListController($scope, $http) {        //decorator
        $scope.tuhdoo = {title: "initial title", details: "Lorem ipsum Lorem ipsum"};
        $scope.addTuhdoo = addTuhdoo;
        $scope.removeTuhdoo = removeTuhdoo;
        $scope.selectTuhdoo = selectTuhdoo;
        $scope.updateTuhdoo = updateTuhdoo;


        function init(){
            $http.get('/api/tuhdoo')
                .then(function(response){
                    console.log(response);
                    $scope.tuhdoos = response.data;
                });
        }
        init();
        function updateTuhdoo(tuhdoo) {
            $scope.tuhdoos[$scope.selectedIndex] = angular.copy(tuhdoo);
        }
        function addTuhdoo(tuhdoo) {
            //var newTuhdoo = {
            //    title: tuhdoo.title
            //};
            var newTuhdoo = angular.copy(tuhdoo);
            newTuhdoo._id = (new Date()).getTime();     //fake the primary keys
            newTuhdoo.date = new Date();
            $scope.tuhdoos.push(newTuhdoo);
            //  console.log($scope.tuhdoos);
        }

        function removeTuhdoo(tuhdoo) {
            var index = $scope.tuhdoos.indexOf(tuhdoo);
            //$scope.tuhdoos.splice(index, 1); // splice behaves differently depending on the arguments
            $http.delete('/api/tuhdoo/'+index)
                .then(function(response){
                    $scope.tuhdoos = response.data;
                })
        }
        function selectTuhdoo(index) {
            $scope.tuhdoo = angular.copy($scope.tuhdoos[index]);
            $scope.selectedIndex = index;
        }
    }
})(); //IIFE - an anonymous function, throwaway, invoked once. Immediately invokable function; self executes


