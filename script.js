console.log("hello");
window.addEventListener("load", init)

function init() {
    // buttons
    let buttonC = document.getElementById("C");
    let buttonF = document.getElementById("F");
    // changeImage("rain"); // must pass in an image, ex: "snowflake"

    // events, can define the function within the event!!!
    // when click Cbutton, get value in Celcius, must not keep adding when already Celsius
    // F - > C
    buttonC.addEventListener("click",
        function() {
            let temp = document.querySelector("h1");
            let temp_num = parseInt(temp.innerText);
            console.log(temp_num); // shows 14, as in 14 degrees Celsius
            temp.innerText = FtoC(temp_num) + '\xB0'; // should be
            buttonC.disabled = true; // can't click on C anymore
            buttonF.disabled = false; // can click on Fahrenheit
        }
    )
    // when click button, get value in Fahrenheit
        // C - > F
    buttonF.addEventListener("click",
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
        let image = document.getElementById("img");
        console.log(image);
        img.src = "images/" + new_img + ".svg"; // to be able to change between images
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

