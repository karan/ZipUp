function initialize() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showOnMap);
  } else {
    body.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showOnMap(position) {
  var latitude = position.coords.latitude;
  var longitude = position.coords.longitude;
  var myLatlng = new google.maps.LatLng(latitude, longitude);
  var location = latitude + "," + longitude;
  var mapOptions = {
    center: myLatlng,
    zoom: 17
  };
  map = new google.maps.Map(document.getElementById("add_map_canvas"),
    mapOptions);
  var marker = new google.maps.Marker({
    position: myLatlng,
    map: map,
    title: "You are here!",
  });

  google.maps.event.addListener(map, "click", function(event) {
    var lat = event.latLng.lat();
    var lng = event.latLng.lng();

    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(lat, lng),
      map: map,
      title: "Selected",
    });
    $('#add_lat').val(lat);
    $('#add_lon').val(lng);
  });
}

google.maps.event.addDomListener(window, 'load', initialize);
