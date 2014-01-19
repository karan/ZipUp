function initialize() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showOnMap);
  }
  else{
    body.innerHTML="Geolocation is not supported by this browser.";
  }
}
function showOnMap(position) {
  var latitude = position.coords.latitude;
  var longitude = position.coords.longitude;
  var myLatlng = new google.maps.LatLng(latitude, longitude);
  var location = latitude + "," + longitude; 
  var mapOptions = {
    center: myLatlng,
    zoom: 20
  };
  var map = new google.maps.Map(document.getElementById("map-canvas"),
      mapOptions);
  var currentPosition = new google.maps.Marker({
    position: myLatlng,
    map: map,
    title:"You are here!"
  });
  currentPosition.setMap(map);
}
google.maps.event.addDomListener(window, 'load', initialize);google.maps.event.addDomListener(window, 'load', initialize);