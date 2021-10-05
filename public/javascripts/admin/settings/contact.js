$(document).ready(() => {
  var lat = $("#lat").val();
  var lng = $("#lng").val();
  var map;
  var pin;
  var tilesURL = "https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png";
  var mapAttrib = '&copy; <a href="http://majidev.ir">MAJIDEV</a>';

  // add map container
  $("#mapdiv").prepend('<div id="map" style="height:40vh;width:100%;"></div>');
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

    marker = L.marker([lat, lng], { riseOnHove: true, draggable: true }).addTo(
      map
    );
    // create the tile layer with correct attribution
    L.tileLayer(tilesURL, {
      attribution: mapAttrib,
      maxZoom: 19,
    }).addTo(map);
  }

  map.on("click", function (ev) {
    lat = ev.latlng.lat;
    lng = ev.latlng.lng;
    map.removeLayer(marker);
    if (typeof pin == "object") {
      pin.setLatLng(ev.latlng);
    } else {
      pin = L.marker([lat, lng], { riseOnHover: true, draggable: true });
      pin.addTo(map);
      pin.on("drag", function (ev) {
        $("#lat").val(ev.latlng.lat);
        $("#lng").val(ev.latlng.lng);
      });
    }
  });
  $("#addressTellEmailBTN").on("click", () => {
    const address = $("#addressInput").val();
    const email = $("#emailInput").val();
    const tell = $("#tellInput").val();

    const data = {
      address,
      email,
      tell,
      lat,
      lng,
    };
    $.ajax({
      type: "put",
      url: "/admin/settings/contact",
      data: data,
      success: function (response) {
        Swal.fire({
          icon: "success",
          title: "تغییرات با موفقیت اعمال شد.",
        });
        setTimeout(() => {
          location.reload();
        }, 3000);
      },
      error: (err) => {
        console.log(err);
      },
    });
  });
});
