var geocodingUrl = 'http://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/find?f=json&text=';
var geometryUrl = 'http://tasks.arcgisonline.com/ArcGIS/rest/services/Geometry/GeometryServer/distance?f=json&distanceUnit=9035';

var getLocation = function(address) {
    return new Promise(function (resolve, reject) {
        //Create HTTP Request
        var request = new XMLHttpRequest();
        var requestUrl = geocodingUrl + encodeURI(address);

        request.open('GET', requestUrl);

        request.onload = function () {
            if (request.status === 200) {
                resolve(request.response);
            }
            else {
                reject(Error(request.statusText));
            }
        };

        request.onerror = function () {
            reject(Error("Network Error!"));
        };

        request.send();
    });
};

var submitButtonClick = function() {
    var startElement = document.getElementById('startAddress');
    var endElement = document.getElementById('endAddress');

    var firstLocation = null;
    var secondLocation = null;

    getLocation(startElement.value).then(function (response) {
        firstLocation = JSON.parse(response);
        getLocation(endElement.value).then(function (response) {
            secondLocation = JSON.parse(response);
            console.log('First location: ', firstLocation);
            console.log('Second location: ', secondLocation);
        }, function (error) {
            console.log(error);
        });
    }, function (error) {
        console.log(error);
    });
};