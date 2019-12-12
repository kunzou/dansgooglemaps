
function geocodeAddress() {
  // var address = decodeURI(location.search.match(/\?(.*)/)[1]);
  // var address = '83 Wilford Close, Winnipeg';
  
  var addresses = [
    '83 Wilford Close, Winnipeg', 
    '43 Twickenham Cir, Winnipeg, MB R2N 4P2, Canada'
  ];
  
  document.title = 'Properties';
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12
  });
  var geocoder = new google.maps.Geocoder();
  var input = document.getElementById('pac-input');
  var searchBox = new google.maps.places.SearchBox(input);
  var service = new google.maps.places.PlacesService(map);
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(input);
  
  addresses.forEach(function(address) {
    geocoder.geocode({'address': address}, function(results, status) {
      if (status === 'OK') {
        results.forEach(function(result) {
          map.setCenter(result.geometry.location);
          var marker = new google.maps.Marker({
            map: map,
            animation: google.maps.Animation.DROP,
            position: result.geometry.location,
            title: result.name
          });
          google.maps.event.addListener(marker, 'click', function() {
            var infoWindow = new google.maps.InfoWindow({
              content: '<strong>' + result.formatted_address + '</strong>'
            });
            infoWindow.open(map, this);
          });
        });
      } else {
        alert('Address lookup was not successful for the following reason: ' + status);
      }
      
    })});
    
    map.addListener('bounds_changed', function() {
      searchBox.setBounds(map.getBounds());
    });
    
    // searchBox.addListener('places_changed', function() {
    //   var places = searchBox.getPlaces();
    
    //   if (places.length == 0) {
    //     return;
    //   }
    
    //   // For each place, get the icon, name and location.
    //   var bounds = new google.maps.LatLngBounds();
    //   places.forEach(function(place) {
    //     if (!place.geometry) {
    //       console.log("Returned place contains no geometry");
    //       return;
    //     }
    
    //     createMarker(place, map);
    
    //     if (place.geometry.viewport) {
    //       // Only geocodes have viewport.
    //       bounds.union(place.geometry.viewport);
    //     } else {
    //       bounds.extend(place.geometry.location);
    //     }
    //   });
    
    //   map.fitBounds(bounds);
    // });
  };
  
  // function createMarker(place, map) {
  //     var icon = {
  //       url: place.icon,
  //       scaledSize: new google.maps.Size(25, 25)
  //     };
  //     var marker = new google.maps.Marker({
  //         position: place.geometry.location,
  //         icon: icon,
  //         map: map,
  //         animation: google.maps.Animation.DROP,
  //         title: place.name,
  //     });
  //     google.maps.event.addListener(marker, 'click', function() {
  //       var infoWindow = new google.maps.InfoWindow({
  //         content: place.formatted_address
  //       });
  //       infoWindow.open(map, this);
  //     });
  //     return marker;
  // }
  