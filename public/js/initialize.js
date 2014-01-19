var infowindow = null;
var markerArray = [];
var map = null;

function initialize() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showOnMap);
  } else {
    body.innerHTML = "Geolocation is not supported by this browser.";
  }
  infowindow = new google.maps.InfoWindow({
    content: "placeholder",
    maxWidth: 300
  });
}

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2 - lat1); // deg2rad below
  var dLon = deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180)
}

function showOnMap(position) {
  var pinColor = "EEEEEE";
  var pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColor,
    new google.maps.Size(21, 34),
    new google.maps.Point(0, 0),
    new google.maps.Point(10, 34));
  var pinShadow = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_shadow",
    new google.maps.Size(40, 37),
    new google.maps.Point(0, 0),
    new google.maps.Point(12, 35));

  var latitude = position.coords.latitude;
  var longitude = position.coords.longitude;
  var myLatlng = new google.maps.LatLng(latitude, longitude);
  var location = latitude + "," + longitude;
  var mapOptions = {
    center: myLatlng,
    zoom: 17
  };
  map = new google.maps.Map(document.getElementById("map_canvas"),
    mapOptions);
  var marker = new google.maps.Marker({
    position: myLatlng,
    map: map,
    title: "You are here!",
    icon: pinImage,
    shadow: pinShadow
  });

  $.get("/get/bathrooms/", function (data, status) {

    for (var i = 0; i < data.bathrooms.length; i++) {

      if (data.bathrooms[i]["loc"] != undefined) {
        console.log("creating bathroom: " + data.bathrooms[i]["name"]);
        var lat = data.bathrooms[i]["loc"].lat;
        var lng = data.bathrooms[i]["loc"].lng;
        var name = data.bathrooms[i]["name"];
        var genderNum = data.bathrooms[i]["gender"];
        var gender;
        var typeNum = data.bathrooms[i]["requirements"];
        var type;
        if (genderNum == 0) {
          gender = "Men's";
        } else if (genderNum == 1) {
          gender = "Women's";
        } else {
          gender = "Unisex";
        }
        if (typeNum == 0) {
          type = "Public";
        } else if (typeNum == 1) {
          type = "Private";
        } else {
          type = "Customers Only";
        }
        var distance = getDistanceFromLatLonInKm(latitude, longitude, lat, lng) * 1000;
        if (distance <= 500) {
          var restRoom = new google.maps.LatLng(lat, lng);
          var nearby = new google.maps.Marker({
            position: restRoom,
            map: map,
            title: name
          });
          var contentString = '<div class="content">' +
            '</div>' +
            '<h3 class="firstHeading">' + name + '</h3>' +
            '<div id="bodyContent">' +
            '<p>Gender: ' + gender + '<br/>' + /* Put restroom specific information in this message*/
            'Type: ' + type + '</p>' +
            '<input type="submit" class="btn" id="review" text="Review"></div>';
          nearby.html = contentString;
          markerArray.push(nearby);
        }
      }
    }
    for (var i = 0; i < markerArray.length; i++) {
      var marker = markerArray[i];
      google.maps.event.addListener(marker, 'click', (function (marker) {
        return function() {
          infowindow.setContent(marker.html);
          infowindow.open(map, marker);
        }
      })(marker));
    }
  });
}
google.maps.event.addDomListener(window, 'load', initialize);
