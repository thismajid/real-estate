var lat = $("#lat").val();
var lng = $("#lng").val();
var map;
var pin;
var tilesURL = "https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png";
var mapAttrib = '&copy; <a href="http://majidev.ir">MAJIDEV</a>';

MapCreate();

function MapCreate() {
  // create map instance
  if (!(typeof map == "object")) {
    map = L.map("map", {
      center: [lat, lng],
      zoom: 16,
    });
  } else {
    map.setZoom(3).panTo([40, 0]);
  }

  marker = L.marker([lat, lng]).addTo(map);
  // create the tile layer with correct attribution
  L.tileLayer(tilesURL, {
    attribution: mapAttrib,
    maxZoom: 19,
  }).addTo(map);
}
