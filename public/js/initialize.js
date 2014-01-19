console.log('Called');

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
    zoom: 17
  };
  var map = new google.maps.Map(document.getElementById("map-canvas"),
      mapOptions);
  var marker = new google.maps.Marker({
    position: myLatlng,
    title:"You are here!"
  });
  
  $.get("/get/bathrooms/",function(data,status){
    //JSON.parse(data);
    for (var i = 0; i < data.bathrooms.length; i++) {
      if (data.bathrooms[i]["loc"] != undefined) {
        console.log(data.bathrooms[i]);
        var lat = data.bathrooms[i]["loc"].lat;
        var lng = data.bathrooms[i]["loc"].lng;
        var name = data.bathrooms[i]["name"];
        var gender = data.bathrooms[i]["gender"];

        var queryURL = "http://maps.googleapis.com/maps/api/distancematrix/json?"+

        /*var queryURL = "http://maps.googleapis.com/maps/api/distancematrix/json?"+
            "origins="+latitude+","+longitude+
            "&destinations="+lat+","+lng+
            "&mode="+"walking"+
            "&sensor="+"false"
        console.log(queryURL);
        $.get(queryURL, function(data,status){
            JSON.parse(data);
            if (data.status == "OK") {
              var distance = data.rows.elements.distance.value;*/
              var distance = Math.sqrt(Math.abs(Math.pow((lat - latitude),2) - Math.pow((lng - longitude),2)));
              console.log(distance);
              if (distance <= 500) {
                var restRoom = new google.maps.LatLng(lat, lng);
                  var nearby = new google.maps.Marker({
                    position: restRoom,
                    map: map,
                    title:"Restroom"
                });
                var contentString = '<div class="content">'+
                '</div>'+
                '<h1 id="firstHeading" class="firstHeading">' + name + '</h1>'+
                '<div id="bodyContent">'+
                '<p>Gender: ' + gender + '</p>'+ /* Put restroom specific information in this message*/
                '</div>';
                var infowindow = new google.maps.InfoWindow({
                    content: contentString,
                    maxWidth: 200
                });
                google.maps.event.addListener(nearby, 'click', function() {
                  infowindow.open(map, nearby);
                });
                    title:"REST ROOM!"
                  });
                  nearby.setMap(map);\
              }
            //}
          //});
        //}
      }
    }
  });
}
google.maps.event.addDomListener(window, 'load', initialize);
