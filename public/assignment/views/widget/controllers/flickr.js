(function () {
    angular
        .module('WebAppMaker')
        .controller('flickrController', flickrController);
    var model = this;
    model.searchPhotos = searchPhotos;

    function searchPhotos (searchTerm) {
        FlickrService
            .searchPhotos(searchTerm)
            .then(function(response) {
                data = response.data.replace("jsonFlickrApi(","");
                data = data.substring(0,data.length - 1);
                data = JSON.parse(data);
                model.photos = data.photos;
            });
    }

});

