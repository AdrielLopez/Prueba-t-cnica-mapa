let map = L.map('map').setView([-34.609, -58.395], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("Estas son las coordenadas: " + e.latlng.toString().substring(6))
        .openOn(map);
}

map.on('click', onMapClick);