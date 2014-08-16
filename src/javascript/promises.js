var geocodingUrl = 'http://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/find?f=json&text=';

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

var buttonClick = function() {
    var element = document.getElementById('address');
    console.log(element);
};