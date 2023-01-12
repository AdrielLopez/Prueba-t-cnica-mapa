
// implementación del mapa, seteo de vista incial.
let map = L.map('map').setView([-34.609, -58.395], 13);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var popup = L.popup();

// función para mostrar coordenadas cuando clickeas sobre un lugar.

function onMapClick(e) {
    popup
      .setLatLng(e.latlng)
      .setContent("Estas son las coordenadas (Lat, Lon): " + e.latlng.toString().substring(6))
    .openOn(map);
  
  // EXTRA POINT: Sería una mejora si la posición se puede buscar o seleccionar del mapa.
  // Cree un array para separar Latitud y longitud, tuve que utilizar varios metodos para poder seleccionar correctamente las coordenadas
  // Luego se utiliza getElementById para setearle su correspondiente valor
  
  let arrayLatLgn = e.latlng.toString().substring(6).slice(1,-1).split(",");
  document.getElementById("cordLat").value = arrayLatLgn[0];
  document.getElementById("cordLon").value = arrayLatLgn[1].slice(1);
}

map.on('click', onMapClick);

// función para el botón Agregar, agarra toda la data del form, la manipula y guarda en el localStorage como JSON. 
function handleSubmit(event) {
  // primero agarra la información del form
  event.preventDefault();
  const data = new FormData(event.target);
  const allData = Object.fromEntries(data.entries());
  // se crea la marca y popup con los datos
  L.marker([allData.cordLat, allData.cordLon]).addTo(map).bindPopup("<b>Descripción: </b>" + allData.name +
    "<br><b>Dirección: </b>" + allData.address + "<br><b>Telefónico: </b>" + allData.phone +
    "<br><b>(Lat, Lon): </b>" + allData.cordLat + "," + allData.cordLon + "<br><b>Categoría: </b>" + allData.category).openPopup();

  // se guarda en el localstorage, en caso de ser la primera marca, inicializa un array, y va pusheando las nuevas marcas a este.
  let points = JSON.parse(localStorage.getItem("allPoints"));
  if (points == null) points = [];
  localStorage.setItem("point", JSON.stringify(allData));
  points.push(allData);
  localStorage.setItem("allPoints", JSON.stringify(points));
  console.log(points)

  
}

// función para cargar las marcas cuando se refresca/abre la pagina.
function loadAllPoints() {
  // se buscan las marcas en el localStorage.
  let allPoints = JSON.parse(localStorage.getItem("allPoints"));
  // sí es que existe alguna marca, se recorre el array creando la marca con su popup.
  console.log(allPoints)
  if (allPoints) {
    for (i = 0; i < allPoints.length; i++) { 
      L.marker([allPoints[i].cordLat, allPoints[i].cordLon]).addTo(map).bindPopup("<b>Descripción: </b>" +
        allPoints[i].name + "<br><b>Dirección: </b>" + allPoints[i].address + "<br><b>Telefónico: </b>" +
        allPoints[i].phone + "<br><b>(Lat, Lon): </b>" + allPoints[i].cordLat + "," + allPoints[i].cordLon +
        "<br><b>Categoría: </b>" + allPoints[i].category).openPopup();
      console.log("cree la marca")
    } 
  }
}

const form = document.querySelector('form');
form.addEventListener('submit', handleSubmit);
document.addEventListener("DOMContentLoaded", loadAllPoints);