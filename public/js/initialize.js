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

	$.get("demo_test.asp",function(data,status){
    if (status == 200) {
    	JSON.parse(data);
   		for (var i = 0; i < data.bathroom.length; i++) {
   			var lat = data.bathroom[i].lat;
   			var lng = data.bathroom[i].lng;
   			$.post("http://maps.googleapis.com/maps/api/distancematrix/json?origins=Vancouver+BC|Seattle&destinations=San+Francisco|Victoria+BC&mode=bicycling&language=fr-FR&sensor=false",
  				{
				    origins: latitude + "," + longitude,
				    destinations: lat+ "," + lng
				    mode: "walking"
				  },
				  function(data,status){
				    JSON.parse(data);
				    if (data.status == "OK") {
				    	var distance = data.rows.elements.distance.value;
				    	if (distance <= 500) {
				    		var restRoom = new google.maps.LatLng(lat, lng);
				    		  var currentPosition = new google.maps.Marker({
								    position: restRoom
								    map: map,
									  title:"REST ROOM!"
								  });
								  currentPosition.setMap(map);
				    	}
				    }
				  });
   		}
    }
  });
}
google.maps.event.addDomListener(window, 'load', initialize);google.maps.event.addDomListener(window, 'load', initialize);