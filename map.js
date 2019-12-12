function geocodeAddress() {
  var center = {lat: 49.884629, lng: -97.1315458};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 11,
    center: center
  });
  
  var infowindow =  new google.maps.InfoWindow({});
  var marker, count;
  for (count = 0; count < locations.length; count++) {
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(locations[count][1], locations[count][2]),
      icon: locations[count][3],
      animation: google.maps.Animation.DROP,
      map: map,
      title: locations[count][0]
    });
    google.maps.event.addListener(marker, 'click', (function (marker, count) {
      return function () {
        infowindow.setContent(locations[count][0]);
        infowindow.open(map, marker);
      }
    })(marker, count));
  } 
}