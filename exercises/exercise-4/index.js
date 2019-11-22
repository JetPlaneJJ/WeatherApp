// LOOK AT THIS!!!! Ask me if you find this weird!?!?!
window.addEventListener("load", init); // part 1
//window.addEventListener("load", main); // part 2: weather data gathering

/* function main() {
    let url = "";
    fetch(url) // an asynchronous function, passes value to .then
    .then((function(data)) {
        //console.log("finished loading") ** see end comment
        return data.json()
    })
    .then((function(data)) {
        //console.log("finished loading")
        console.log(data)
    })
    .catch(function(err)) { // catches error b4 chaos ensues
        console.log(err);
    }
    console.log("hi!") // ** because of "fetch", this line prints first,
                        // then go to .then, print "finished loading"

    // results of query
        // status
        // random bunch of stuff...

    // how do we get specific data that we want!
    // use .json instead of console.log(data.json()) to return just the JSON data
}*/



function init() {
    /*
    *   Change the src attribute of the img tag so that it shows
    *   the banana.jpg picture instead of the pickles.jpg picture
    *   "only when the image in hovered"
    */

    // elements to be changed
    let elementPic = document.getElementById("pic");
    let h1_elem = document.getElementById("hh");
    // functions
    function changePicture() {
        elementPic.src = "banana.jpg";
    }
    function changePicture2() {
        elementPic.src = "pickles.jpg";
    }
    function changeText() {
        h1_elem.style.color = 'red';
        h1_elem.font
    }
    function changeText2() {
        h1_elem.style.color = 'black';
    }
    // events
    elementPic.addEventListener("mouseover", changePicture);
    elementPic.addEventListener("mouseout", changePicture2);
    elementPic.addEventListener("mouseover", changeText); // this doesn't work lol
    elementPic.addEventListener("mouseout", changeText2);
}