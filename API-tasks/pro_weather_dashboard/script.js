var cityInput = document.getElementById("cityInput");
var searchBtn = document.getElementById("searchBtn");
var locBtn = document.getElementById("locBtn");

searchBtn.onclick = function () {
  var city = cityInput.value;
  fetch("https://geocoding-api.open-meteo.com/v1/search?name=" + city)
    .then(function (r) {
      return r.json();
    })
    .then(function (d) {
      var lat = d.results[0].latitude;
      var lon = d.results[0].longitude;
      var name = d.results[0].name;
      document.getElementById("locationName").textContent = name;
      document.getElementById("coords").textContent = lat + ", " + lon;
      loadWeather(lat, lon);
    });
};

locBtn.onclick = function () {
  navigator.geolocation.getCurrentPosition(function (p) {
    var lat = p.coords.latitude;
    var lon = p.coords.longitude;
    document.getElementById("coords").textContent = lat + ", " + lon;
    loadWeather(lat, lon);
  });
};

function loadWeather(lat, lon) {
  fetch(
    "https://api.open-meteo.com/v1/forecast?latitude=" +
      lat +
      "&longitude=" +
      lon +
      "&current_weather=true&hourly=temperature_2m&daily=temperature_2m_max,temperature_2m_min&timezone=auto",
  )
    .then(function (r) {
      return r.json();
    })
    .then(function (d) {
      var w = d.current_weather;
      document.getElementById("temp").textContent = w.temperature;
      document.getElementById("wind").textContent = w.windspeed;
      document.getElementById("time").textContent = w.time;

      var hourly = document.getElementById("hourly");
      hourly.textContent = "";

      for (var i = 0; i < 12; i++) {
        var box = document.createElement("div");
        box.className = "box";

        var t = document.createElement("p");
        t.textContent = d.hourly.time[i].split("T")[1];

        var v = document.createElement("p");
        v.textContent = d.hourly.temperature_2m[i] + "°";

        box.appendChild(t);
        box.appendChild(v);
        hourly.appendChild(box);
      }

      var daily = document.getElementById("daily");
      daily.textContent = "";

      for (var i = 0; i < 7; i++) {
        var box2 = document.createElement("div");
        box2.className = "box";

        var d1 = document.createElement("p");
        d1.textContent = d.daily.time[i];

        var d2 = document.createElement("p");
        d2.textContent =
          d.daily.temperature_2m_max[i] +
          "° / " +
          d.daily.temperature_2m_min[i] +
          "°";

        box2.appendChild(d1);
        box2.appendChild(d2);
        daily.appendChild(box2);
      }
    });
}
