function initMap() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        var myLatLng = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        var map = new google.maps.Map(document.getElementById('map'), {
          center: myLatLng,
          zoom: 14,
        });
        var marker = new google.maps.Marker({
          position: myLatLng,
          map: map,
          title: "Sua Localização Atual",
        });
        
        var placesService = new google.maps.places.PlacesService(map)
        nearestPharmacies(placesService, myLatLng, map);

        // Função para pesquisar e mostrar a localização
        window.searchLocation = function () {
          var input = document.getElementById("search-input");
          var searchQuery = input.value;

          var autocompleteService = new google.maps.places.AutocompleteService();
          autocompleteService.getPlacePredictions(
            { input: searchQuery },
            function (predictions, status) {
              if (
                status ===
                  google.maps.places.PlacesServiceStatus.OK &&
                  predictions &&
                  predictions.length > 0
              ) {
                var placeId = predictions[0].place_id;

                
                var placesService = new google.maps.places.PlacesService(map);
                placesService.getDetails(
                { placeId: placeId },
                  function (place, status) {
                    if (status === google.maps.places.PlacesServiceStatus.OK) {
                      var newLatLng = {
                        lat: place.geometry.location.lat(),
                        lng: place.geometry.location.lng(),
                      };
                      
                      map.setCenter(newLatLng);
                      marker.setPosition(newLatLng);
                      map.setZoom(14);
                      nearestPharmacies(placesService, newLatLng, map);
                    }
                  }
                );
              } else {
                console.error("Erro na pesquisa de local:", status);
              }
            }
          );
        };
      },
        function (error) {
          console.error("Erro na geolocalização:", error.message);
      }
    );
  } else {
    console.error("Geolocalização não suportada pelo navegador.");
  }
}

function initAutocomplete() {
  var input = document.getElementById('search-input');
  var autocomplete = new google.maps.places.Autocomplete(input);
  autocomplete.setFields(['place_id', 'geometry', 'name']);
}

function nearestPharmacies(placesService, posAtual, map) {
    placesService.nearbySearch({
    location: posAtual,
    radius: 7000,
    types: ['drugstore']
  }, function (results) {
    var listPharmacy = document.getElementById('nearby-pharmacies');
    listPharmacy.innerHTML = '';

    for (var i = 0; i < Math.min(results.length, 5); i++) {
      var nearPharmacy = results[i];
      var nearPharmacyLatLng = {
        lat: nearPharmacy.geometry.location.lat(),
        lng: nearPharmacy.geometry.location.lng()
      };
      
      var distance = haversine_distance(posAtual, nearPharmacyLatLng);

      listPharmacy.innerHTML += `<p>${nearPharmacy.name} - ${distance.toFixed(2)} km</p>`;
      
      var marker = new google.maps.Marker({
        position: nearPharmacyLatLng,
        map: map,
        title: nearPharmacy.name,
        icon: {
          url: "https://static.vecteezy.com/system/resources/previews/017/177/954/non_2x/round-medical-cross-symbol-on-transparent-background-free-png.png",
          scaledSize: new google.maps.Size(30, 30),
        }
      });
    }
  });
}
// Função para calcular distância entre os pontos
function haversine_distance(posAtual, posPharm) {
  var R = 6371; // Radius of the Earth in kilometers
  var rlat1 = posAtual.lat * (Math.PI/180); // Convert degrees to radians
  var rlat2 = posPharm.lat * (Math.PI/180); // Convert degrees to radians
  var difflat = rlat2 - rlat1; // Radian difference (latitudes)
  var difflon = (posPharm.lng - posAtual.lng) * (Math.PI/180); // Radian difference (longitudes)

  var a = Math.sin(difflat/2) * Math.sin(difflat/2) +
          Math.cos(rlat1) * Math.cos(rlat2) *
          Math.sin(difflon/2) * Math.sin(difflon/2);

  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

  var d = R * c;
  return d;
}