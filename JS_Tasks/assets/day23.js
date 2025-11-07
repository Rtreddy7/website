//Task1: Getting final price as o/p after the discount of two items.

const batCost = 3780;
const shoeCost = 3470;
const discountPrice = 15;

//finding total price initially
const totalCost = batCost + shoeCost;

// final price:

const finalPrice = totalCost * (1- discountPrice/100);

console.log("Final price after discount: ", finalPrice);


//Task-2:

const age = 27;
let country = "USA";


if(age >= 18 && (country == "India" || country == "USA")){
    console.log("Allowed");
}else{
    console.log("Not Allowed");
}


