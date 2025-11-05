//JS-Basics on Variables

let name = "Ravi Teja"; //string
let age = 27; // numeric
let hobbies = ["cricket", "badminton", "hiking", "camping"]; //arrays
let car = {
    brand: "Vovo",
    model: "XC90",
    year_released: 2003
}; //Object

let isCorrect = "True"; //boolean
let bio; //undefined
let movie = "null"; //null value


//calling the variable in console
console.log("Name:", name);
console.log("Hobbies:", hobbies[4]);
console.log(car);
console.log(isCorrect);
console.log(movie);

//calling the variables in html_webpage

document.getElementById("value").innerHTML = name;
document.getElementById("value").innerHTML = hobbies;
document.getElementById("value").innerHTML = car;
document.getElementById("value").innerHTML = isCorrect;
document.getElementById("value").innerHTML = bio;
document.getElementById("value").innerHTML = movie;
