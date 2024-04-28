/*********************************************************
 *
 *
 *                    utils.js
 *
 * This file contains utility functions for most of the project front-end.
 *
 *
 *******************************************************/

// Movie-ticket component function to toggle the display of the moreInfo div :
function moreInfo() {
  var moreInfo = document.getElementById("moreInfo");
  var moreInfoBtn = document.getElementById("moreInfoBtn");
  var lessInfoBtn = document.getElementById("lessInfoBtn");

  if (moreInfo.style.display === "none") {
    moreInfo.style.display = "block";
    moreInfoBtn.classList.add("d-none");
    lessInfoBtn.classList.remove("d-none");
  } else {
    moreInfo.style.display = "none";
    moreInfoBtn.classList.remove("d-none");
    lessInfoBtn.classList.add("d-none");
  }
}

// Theater list component function to toggle the display of the moreInfo div :
function toggleActive(element) {
  var allElements = document.querySelectorAll(".list-group-item");
  allElements.forEach(function (el) {
    el.classList.remove("active");
  });
  element.classList.add("active");
}

function initMap(locations) {
  const infoLocation = document.getElementById("info-location");

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        centerMapOnLocation([
          position.coords.longitude,
          position.coords.latitude,
        ]);
      });
    } else {
      infoLocation.innerHTML =
        "Vous devez activer la géolocalisation dans les paramètres de votre navigateur.";
    }
  }

  var map = L.map("map").setView([0, 0], 13);

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  function centerMapOnLocation(location) {
    var latitude = location[0];
    var longitude = location[1];

    map.setView([latitude, longitude], 12);

    locations.forEach(function (location) {
      addMarker(map, location.longitude, location.latitude, location.name);
    });

    L.marker([longitude, latitude])
      .addTo(map)
      .bindPopup("Votre position")
      .openPopup();
  }

  var markers = [];

  function addMarker(map, lng, lat, name) {
    var marker = L.marker([lat, lng]).addTo(map);
    marker.bindPopup(name);
    markers.push(marker);
  }

  $('a[data-bs-toggle="tab"]').on("shown.bs.tab", function (e) {
    if (e.target.hash === "#carte") {
      map.invalidateSize();
    }
  });
  getLocation();
}
