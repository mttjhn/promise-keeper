var geocodingUrl = 'http://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/find?f=json&text=';
var distanceUrl = 'http://tasks.arcgisonline.com/ArcGIS/rest/services/Geometry/GeometryServer/distance?f=json&distanceUnit=9035';

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

var geometryToJSON = function (geometry, geometryType, spatialReference) {
  var returnGeometry = {
      "geometryType": geometryType,
      "gemoetry": {
          "x": geometry.x,
          "y": geometry.y,
          "spatialReference": spatialReference
      }
  };
  return JSON.stringify(returnGeometry);
};

var getDistance = function(feature1, feature2, spatialReference) {
    return new Promise(function (resolve, reject) {
        //Create HTTP Request
        var request = new XMLHttpRequest();
        var feature1JSON = geometryToJSON(feature1, 'esriGeometryPoint', spatialReference);
        var feature2JSON = geometryToJSON(feature2, 'esriGeometryPoint', spatialReference);
        var requestUrl = distanceUrl + '&geometry1=' + encodeURI(feature1JSON) + '&geometry2=' + encodeURI(feature2JSON) + '&sr=' + encodeURI(spatialReference.wkid);

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
    var distance = null;

    getLocation(startElement.value).then(function (response) {
        console.log('Found first location!');
        firstLocation = JSON.parse(response);
        getLocation(endElement.value).then(function (response) {
            console.log('Found second location!');
            secondLocation = JSON.parse(response);
            // Now get distance!
            getDistance(firstLocation.locations[0].feature.geometry, secondLocation.locations[0].feature.geometry, firstLocation.spatialReference).then(function (response) {
                console.log('Got distance!');
                distance = JSON.parse(response);
            }, function (error) {
                console.log(error);
            });
        }, function (error) {
            console.log(error);
        });
    }, function (error) {
        console.log(error);
    });
};