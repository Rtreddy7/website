var apiKey = "c027aff2345dfa8e239334294a0e0bd6"

var searchInput = document.getElementById("searchInput")
var suggestions = document.querySelector(".suggestions")

var searchButton = document.querySelectorAll(".button")[0]
var locationButton = document.querySelectorAll(".button")[1]
var refreshButton = document.querySelectorAll(".button")[2]

var locationPlace = document.getElementById("locationPlace")
var locationNearest = document.getElementById("locationNearest")
var locationState = document.getElementById("locationState")
var locationAccuracy = document.getElementById("locationAccuracy")

var currentTemp = document.getElementById("currentTemp")
var currentDescription = document.getElementById("currentDescription")
var currentFeels = document.getElementById("currentFeels")
var currentHumidity = document.getElementById("currentHumidity")
var currentWind = document.getElementById("currentWind")
var currentPressure = document.getElementById("currentPressure")

var aqiNumber = document.getElementById("aqiNumber")
var aqiPm25 = document.getElementById("aqiPm25")
var aqiPm10 = document.getElementById("aqiPm10")
var aqiNo2 = document.getElementById("aqiNo2")
var aqiO3 = document.getElementById("aqiO3")

var hourlyForecast = document.getElementById("hourlyForecast")
var dailyForecast = document.getElementById("dailyForecast")

var sunriseTime = document.getElementById("sunriseTime")
var sunsetTime = document.getElementById("sunsetTime")

var highlightUv = document.getElementById("highlightUv")
var highlightVisibility = document.getElementById("highlightVisibility")

var extraClouds = document.getElementById("extraClouds")
var extraGust = document.getElementById("extraGust")
var extraMinMax = document.getElementById("extraMinMax")

var lastLat = null
var lastLon = null

searchButton.addEventListener("click", function () {
    var city = searchInput.value
    getWeatherByCity(city)
})

locationButton.addEventListener("click", function () {
    getLocationWeather()
})

refreshButton.addEventListener("click", function () {
    if (lastLat != null) {
        getWeatherByCoords(lastLat, lastLon)
    }
})

searchInput.addEventListener("input", function () {

    var text = searchInput.value

    if (text.length < 2) {
        suggestions.style.display = "none"
        return
    }

    var url = "https://api.openweathermap.org/geo/1.0/direct?q=" + text + ",IN&limit=5&appid=" + apiKey

    fetch(url)
        .then(function (res) {
            return res.json()
        })
        .then(function (data) {

            while (suggestions.firstChild) {
                suggestions.removeChild(suggestions.firstChild)
            }

            var i = 0

            while (i < data.length) {

                var row = document.createElement("div")
                row.className = "suggestionRow"

                var name = data[i].name
                var state = data[i].state

                row.textContent = name + ", " + state

                row.addEventListener("click", function () {

                    searchInput.value = this.textContent
                    suggestions.style.display = "none"
                    getWeatherByCity(this.textContent)

                })

                suggestions.appendChild(row)

                i = i + 1
            }

            suggestions.style.display = "block"

        })

})

function getLocationWeather() {

    if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(function (pos) {

            var lat = pos.coords.latitude
            var lon = pos.coords.longitude

            lastLat = lat
            lastLon = lon

            locationAccuracy.textContent = Math.round(pos.coords.accuracy) + " m"

            getWeatherByCoords(lat, lon)

        })

    }

}

function getWeatherByCity(city) {

    var url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=" + apiKey

    fetch(url)
        .then(function (res) {
            return res.json()
        })
        .then(function (data) {

            lastLat = data.coord.lat
            lastLon = data.coord.lon

            displayCurrent(data)
            loadForecast(lastLat, lastLon)
            loadAQI(lastLat, lastLon)

        })

}

function getWeatherByCoords(lat, lon) {

    var url = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&units=metric&appid=" + apiKey

    fetch(url)
        .then(function (res) {
            return res.json()
        })
        .then(function (data) {

            displayCurrent(data)
            loadForecast(lat, lon)
            loadAQI(lat, lon)

        })

}

function displayCurrent(data) {

    locationPlace.textContent = data.name
    locationNearest.textContent = data.name
    locationState.textContent = data.sys.country

    currentTemp.textContent = Math.round(data.main.temp) + "°C"
    currentDescription.textContent = data.weather[0].description

    currentFeels.textContent = Math.round(data.main.feels_like) + "°C"
    currentHumidity.textContent = data.main.humidity + "%"
    currentWind.textContent = data.wind.speed + " m/s"
    currentPressure.textContent = data.main.pressure + " hPa"

    sunriseTime.textContent = new Date(data.sys.sunrise * 1000).toLocaleTimeString()
    sunsetTime.textContent = new Date(data.sys.sunset * 1000).toLocaleTimeString()

    highlightVisibility.textContent = data.visibility / 1000 + " km"

    extraClouds.textContent = data.clouds.all + "%"

    if (data.wind.gust) {
        extraGust.textContent = data.wind.gust
    } else {
        extraGust.textContent = "-"
    }

    extraMinMax.textContent = Math.round(data.main.temp_min) + " / " + Math.round(data.main.temp_max)

}

function loadForecast(lat, lon) {

    var url = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&units=metric&appid=" + apiKey

    fetch(url)
        .then(function (res) {
            return res.json()
        })
        .then(function (data) {

            while (hourlyForecast.firstChild) {
                hourlyForecast.removeChild(hourlyForecast.firstChild)
            }

            var i = 0

            while (i < 8) {

                var card = document.createElement("div")
                card.className = "hourCard"

                var time = document.createElement("div")
                time.className = "hourTime"
                time.textContent = data.list[i].dt_txt.split(" ")[1]

                var mid = document.createElement("div")
                mid.className = "hourMid"

                var temp = document.createElement("div")
                temp.className = "hourTemp"
                temp.textContent = Math.round(data.list[i].main.temp) + "°"

                mid.appendChild(temp)

                card.appendChild(time)
                card.appendChild(mid)

                hourlyForecast.appendChild(card)

                i = i + 1
            }

        })

}

function loadAQI(lat, lon) {

    var url = "https://api.openweathermap.org/data/2.5/air_pollution?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey

    fetch(url)
        .then(function (res) {
            return res.json()
        })
        .then(function (data) {

            aqiNumber.textContent = data.list[0].main.aqi
            aqiPm25.textContent = data.list[0].components.pm2_5
            aqiPm10.textContent = data.list[0].components.pm10
            aqiNo2.textContent = data.list[0].components.no2
            aqiO3.textContent = data.list[0].components.o3

        })

}

getLocationWeather()