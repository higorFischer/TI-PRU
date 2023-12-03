document.addEventListener('DOMContentLoaded', () => {
	var map = L.map('map').setView([0, 0], 15);
	var currentMarker = null;

	L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		maxZoom: 19,
	}).addTo(map);

	navigator.geolocation.getCurrentPosition(function(location) {
		var latlng = new L.LatLng(location.coords.latitude, location.coords.longitude);
		currentMarker = L.marker(latlng).addTo(map);

		updatePopup(latlng);
		map.setView(latlng, 15);
	});

	function updatePopup(latlng) {
		fetch('https://api.opencagedata.com/geocode/v1/json?q=' + latlng.lat + '+' + latlng.lng + '&key=2da59c3fc0294ecd803b0d393d56c6d8')
			.then(response => {
				if (!response.ok)
					throw new Error('Erro na requisição da API');
				
				return response.json();
			})
			.then(data => {
				var address = data.results[0].formatted;
				console.log("ue", address)
				map.openPopup(address, latlng);
			})
			.catch(error => {
				console.error('Erro:', error);
				alert('Erro ao obter o endereço do local. Tente novamente.');
			});
	}

	function searchLocation() {
		var query = document.getElementById('search').value;

		fetch('https://api.opencagedata.com/geocode/v1/json?q=' + query + '&key=2da59c3fc0294ecd803b0d393d56c6d8')
			.then(response => {
				if (!response.ok) {
					throw new Error('Erro na requisição da API');
				}
				return response.json();
			})
			.then(data => {
				var latlng = new L.LatLng(data.results[0].geometry.lat, data.results[0].geometry.lng);

				if (currentMarker) {
					currentMarker.setLatLng(latlng);
				} else {
					currentMarker = L.marker(latlng).addTo(map);
				}

				map.setView(latlng, 15);
				updatePopup(latlng);
			})
			.catch(error => {
				console.error('Erro:', error);
				alert('Erro ao buscar o local. Tente novamente.');
			});
	}

	function handleSearch() {
		searchLocation();
	}

	document.getElementById('searchButton').addEventListener('click', handleSearch);

	document.getElementById('search').addEventListener('keyup', function(event) {
		if (event.key === 'Enter') {
			handleSearch();
		}
	});

	map.on('click', function(e) {
		var latlng = e.latlng;

		updatePopup(latlng);
	});
})