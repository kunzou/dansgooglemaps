function geocodeAddress() {
  var center = {lat: 49.884629, lng: -97.1315458};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 11,
    center: center
  });
  
  var infowindow =  new google.maps.InfoWindow({});
  var marker, count;
  locations.forEach(location => {
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(location[1], location[2]),
      icon: location[3],
      animation: google.maps.Animation.DROP,
      map: map,
      title: location[0]
    });
    google.maps.event.addListener(marker, 'click', (function (marker, count) {
      return function () {
        infowindow.setContent(location[0]);
        infowindow.open(map, marker);
      }
    })(marker, count));
  } );
}