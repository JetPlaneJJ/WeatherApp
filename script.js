console.log("hello");
window.addEventListener("load", init)

let Base_API = "//api.openweathermap.org/data/2.5/weather?";
let APIKey = "7b9ef6d5a3c36d00b45d1c53aa1413c9";

function init() {
    /** buttons **/
    let buttonC = document.getElementById("C");
    let buttonF = document.getElementById("F");
    buttonC.disabled = true;
    buttonC.addEventListener("click", // F - > C
        function() {
            let temp = document.querySelector("h1");
            let temp_num = parseInt(temp.innerText);
            console.log(temp_num); // ex: shows 14, as in 14 degrees Celsius
            temp.innerText = FtoC(temp_num) + '\xB0';
            buttonC.disabled = true; // can't click on C anymore
            buttonF.disabled = false; // can click on Fahrenheit
        }
    )
    buttonF.addEventListener("click", // C - > F
        function() {
            let temp = document.querySelector("h1");
            let temp_num = parseInt(temp.innerText);
            console.log(temp_num); // shows 14, as in 14 degrees Celsius
            temp.innerText = CtoF(temp_num) + '\xB0';
            buttonF.disabled = true; // can't click on F anymore
            buttonC.disabled = false;
        }
    )
    function changeImage(new_img) {
        let audio = document.getElementById("audio");
        console.log(audio);
        audio.pause()
        audio.loop = false;
        let image = document.getElementById("img");
        let top = document.getElementById("top");
        top.className = 'flexy';

        let imgs = ["cloudy", "rain", "semi_cloudy", "snowflake", "storm", "sunny"];
        // if not in listed weathers, default cloudy
        if (!imgs.includes(new_img.toLowerCase())) {
            img.src = "images/cloudy.svg";
            top.classList.add("fog");
        }
        else if (new_img.toLowerCase() == "clear") {
            img.src = "images/sunny.svg";
        }
        else {
            img.src = "images/" + new_img.toLowerCase() + ".svg"; // to be able to change between images
        }
        // if rainy, set background animation and raining sound
        if (new_img.toLowerCase() == "rain" || new_img.toLowerCase() == "storm") {
            top.classList.add("rain");
            audio.play()
            audio.loop = true;
        }
        // if snowy, set snow
        if (new_img.toLowerCase() == "snow") {
            top.classList.add("snow");
        }
    }
    changeLocation();
    /** check for user inputs **/
    let buttonZip = document.getElementById("zip_btn");
    let inputZip = document.getElementById("get_zip");

    let buttonCity = document.getElementById("city_btn");
    let inputCity = document.getElementById("get_city");

    let buttonLatLon = document.getElementById("latlon_btn");
    let inputLat = document.getElementById("get_lon");

    buttonZip.addEventListener("click", function(){
        changeLocation("zip")
    })
    inputZip.addEventListener("keyup", function(event) {
        if (event.keyCode === 13) {
            buttonZip.click();
        }
    })
    buttonCity.addEventListener("click", function(){
        changeLocation("city")
    })
    inputCity.addEventListener("keyup", function(event) {
        if (event.keyCode === 13) {
            buttonCity.click();
        }
    })
    buttonLatLon.addEventListener("click", function() {
        changeLocation("latlon")
    })
    inputLat.addEventListener("keyup", function(event) {
        if (event.keyCode === 13) {
            buttonLatLon.click();
        }
    })

    function changeLocation(mode) {
        console.log(mode);
        let units = "metric";
        if (buttonF.disabled) {
            units = "imperial"; // if in Fahrenheit
        }
        let key = "q=Seattle";
        if (mode == "zip") {
            let input = document.getElementById("get_zip");
            key = "zip=" + input.value;
        }
        else if (mode=="city") {
            let input = document.getElementById("get_city");
            key = "q=" + input.value;
        }
        else if (mode=="latlon") {
            let lat = document.getElementById("get_lat");
            let lon = document.getElementById("get_lon");
            key = "lat=" + lat.value + "&lon=" + lon.value;
        }
        console.log(key);
        let url = Base_API + key + "&units=" + units + "&appid=" + APIKey;
        // using the console to check what things to add
        console.log(url);
        // calling the API
        fetch(url)
            // Set up a basic check function (convert promise to response)
            .then(function(data) {
                if (data.status >= 200 && data.status < 300) {
                    return data.text();
                }
                else {
                    return 0;
                }
            })
            // get the temp units
            .then(JSON.parse)
            .then(function(data) {
                let temp = document.querySelector("h1");
                temp.innerText = Math.round(data.main.temp) + '\xB0';

                changeImage(data.weather[0].main);
                console.log(data.weather[0].main);

                let cast = document.querySelector("h4"); // ex: Rainy
                cast.innerText = data.weather[0].main;

                let place = document.querySelector("h3");
                place.innerText = data.name;

                let country = document.querySelector("h5");
                country.innerText = data.sys.country;
            })
            .catch(function(){
                alert("Invalid response, please check your inputs.");
            })
    }
}

function FtoC(degree) {
    let ret = degree - 32;
    ret = ret * 5 / 9;
    return Math.round(ret);
}
function CtoF(degree) {
    let ret = degree * 9 / 5;
    ret = ret + 32;
    return Math.round(ret);
}
