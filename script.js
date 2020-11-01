window.addEventListener("load", init);

let Base_API = "//api.openweathermap.org/data/2.5/weather?";
let APIKey = "7b9ef6d5a3c36d00b45d1c53aa1413c9";

function init() {
  /* Temperature Buttons */
  let buttonC = document.getElementById("C");
  buttonC.alt = "Change to degrees Celsius";
  let buttonF = document.getElementById("F");
  buttonC.alt = "Change to degrees Fahrenheit";
  buttonC.disabled = true;
  /* Location Inputs */
  let buttonZip = document.getElementById("zip_btn");
  let inputZip = document.getElementById("get_zip");

  let buttonCity = document.getElementById("city_btn");
  let inputCity = document.getElementById("get_city");

  let buttonLatLon = document.getElementById("latlon_btn");
  let inputLat = document.getElementById("get_lon");
  let inputLon = document.getElementById("get_lat");

  /* Listeners */
  // F - > C
  buttonC.addEventListener("click", function () {
    let temp = document.querySelector("h1");
    let temp_num = parseInt(temp.innerText);
    temp.innerText = fahrenToCels(temp_num) + "\xB0";
    buttonC.disabled = true;
    buttonF.disabled = false;
  });
  // C - > F
  buttonF.addEventListener("click", function () {
    let temp = document.querySelector("h1");
    let temp_num = parseInt(temp.innerText);
    console.log(temp_num);
    temp.innerText = celsToFahren(temp_num) + "\xB0";
    buttonF.disabled = true;
    buttonC.disabled = false;
  });
  buttonZip.addEventListener("click", function () {
    setLocation("zip");
    clearAllInputs();
  });
  inputZip.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
      buttonZip.click();
    }
  });
  buttonCity.addEventListener("click", function () {
    setLocation("city");
    clearAllInputs();
  });
  inputCity.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
      buttonCity.click();
    }
  });
  buttonLatLon.addEventListener("click", function () {
    setLocation("latlon");
    clearAllInputs();
  });
  inputLat.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
      buttonLatLon.click();
    }
  });
  setLocation();
}

/********************** Changing Place of Weather ************************/
function setLocation(mode) {
  toggleLoading(true);

  let units = "metric";
  if (document.getElementById("F").disabled) {
    units = "imperial"; // Fahrenheit
  }
  if (window.navigator.geolocation && !mode) {
    console.log("yess");
    // grab user's geolocation (with permission)
    navigator.geolocation.getCurrentPosition(
      successfullyGrabGeoLocation,
      errorGrabbingGeoLocation,
      geoLocationOptions
    );
  } else {
    let key = "q=Seattle"; // default Seattle if no geolocation or input
    // user manually inputted key
    if (mode == "zip") {
      let input = document.getElementById("get_zip");
      key = "zip=" + input.value;
    } else if (mode == "city") {
      let input = document.getElementById("get_city");
      key = "q=" + input.value;
    } else if (mode == "latlon") {
      let lat = document.getElementById("get_lat");
      let lon = document.getElementById("get_lon");
      key = "lat=" + lat.value + "&lon=" + lon.value;
    }
    console.log("Key to search by: " + key);
    let url = Base_API + key + "&units=" + units + "&appid=" + APIKey;
    console.log("URL to FETCH: " + url);
    fetchData(url);
  }
}

/* Fetches weather data from OpenWeatherMap */
function fetchData(url) {
  fetch(url)
    .then(function (data) {
      if (data.status >= 200 && data.status < 300) {
        return data.text();
      } else {
        return 0;
      }
    })
    .then(JSON.parse)
    .then(function (data) {
      let temp = document.querySelector("h1");
      temp.innerText = Math.round(data.main.temp) + "\xB0";

      changeWeatherImage(data.weather[0].main);
      console.log("current weather is: " + data.weather[0].main);

      let cast = document.querySelector("h4"); // ex: Rainy
      cast.innerText = data.weather[0].main;

      let place = document.querySelector("h3"); // geo location
      place.innerText = data.name;

      let country = document.querySelector("h5");
      country.innerText = data.sys.country;

      let pressure = document.getElementById("press");
      pressure.opacity = 0;
      pressure.innerText =
        "Atmospheric Pressure: " + data.main.pressure + " hPa";

      let humidity = document.getElementById("humidity");
      humidity.opacity = 0;
      humidity.innerText = "Humidity: " + data.main.humidity + "%";

      let wnd = document.getElementById("windspeed");
      wnd.opacity = 0;
      wnd.innerText = "Wind Speed: " + data.wind.speed + " meters/second";

      toggleLoading(false);
    })
    .catch(function () {
      alert("Invalid response, please check your inputs.");
    });
}

function clearAllInputs() {
  document.getElementById("get_lon").value = "";
  document.getElementById("get_lat").value = "";
  document.getElementById("get_city").value = "";
  document.getElementById("get_zip").value = "";
}
/* Changes the left weather icon to Sun, Cloud... etc */
function changeWeatherImage(new_img) {
  console.log("current img = " + new_img);
  let audio = document.getElementById("audio");
  console.log("current audio: " + audio);
  audio.pause();
  audio.loop = false;
  let img = document.getElementById("img");
  let top = document.getElementById("top");
  top.className = "flexy";

  // Default cloudy
  //   let imgs = ["cloudy", "rain", "semi_cloudy", "snowflake", "storm", "sunny"];
  if (new_img.toLowerCase() == "clear") {
    img.src = "images/sunny.svg";
    img.alt = "Yellow Sun";
  } else if (new_img.toLowerCase() == "clouds") {
    img.src = "images/cloudy.svg";
    img.alt = "Gray Clouds";
    top.classList.add("fog");
  } else if (new_img.toLowerCase() == "snow") {
    img.src = "images/snowflake.svg";
    img.alt = "White Snowflake";
    top.classList.add("snow");
  } else {
    img.src = "images/rain.svg";
    img.alt = "Gray Clouds and Rain";
    top.classList.add("rain");
    audio.play();
    audio.loop = true;
  }
}

/* Temperature conversions */
function fahrenToCels(degree) {
  let ret = degree - 32;
  ret = (ret * 5) / 9;
  return Math.round(ret);
}
function celsToFahren(degree) {
  let ret = (degree * 9) / 5;
  ret = ret + 32;
  return Math.round(ret);
}

/* For grabbing geolocation */
var geoLocationOptions = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

/* Successfully grabbed user's geolocation, changes location */
function successfullyGrabGeoLocation(pos) {
  let key = "lat=" + pos.coords.latitude + "&lon=" + pos.coords.longitude;
  let url = Base_API + key + "&units=" + "metric" + "&appid=" + APIKey;
  console.log("URL to FETCH: " + url);
  fetchData(url);
}
function errorGrabbingGeoLocation(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}

/* Styling */
// for fading in large parts of the page, fadeInDoc = true if fading in
function fadeInOrOutDocument(fadeInDoc) {
  let inputButtons = document.getElementsByClassName("inputs");
  var i;
  for (i = 0; i < inputButtons.length; i++) {
    fadeInOrOut(inputButtons[i], fadeInDoc);
  }
  let inputs = document.getElementsByClassName("input_btn");
  var i;
  for (i = 0; i < inputs.length; i++) {
    fadeInOrOut(inputs[i], fadeInDoc);
  }
  let weatherRightSection = document.getElementById("weather-location-names");
  fadeInOrOut(weatherRightSection, fadeInDoc);
  let img = document.getElementById("img");
  fadeInOrOut(img, fadeInDoc);
  let mid2 = document.getElementById("mid2");
  fadeInOrOut(mid2, fadeInDoc);
}

function fadeInOrOut(element, fadeIn) {
  if (fadeIn) {
    var op = 0; // initial opacity
    var timer = setInterval(function () {
      if (op >= 1) {
        clearInterval(timer);
      }
      element.style.opacity = op;
      element.style.filter = "alpha(opacity=" + op * 100 + ")";
      op += 0.03;
    }, 30);
  } else {
    var op = element.style.opacity;
    var timer = setInterval(function () {
      if (op == 0) {
        clearInterval(timer);
      }
      element.style.opacity = op;
      element.style.filter = "alpha(opacity=" + op * 100 + ")";
      op -= 0.03;
    }, 10);
  }
}
// show is true if should show loading
function toggleLoading(show) {
  let loadingIcon = document.getElementById("loading");
  console.log(loadingIcon);
  if (show) {
    loadingIcon.style.opacity = 1.0;
  } else {
    fadeInOrOut(loadingIcon, false);
  }
}
