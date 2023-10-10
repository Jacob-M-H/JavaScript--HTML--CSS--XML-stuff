console.log('hello world2');
let firstName='Jacob';
//console.log(name); //oddly crossed out.. hm
                //variable names are cammel case, and cannot contain a hyphen.

const interestRate=.3;
console.log(interestRate);

let isApproved=true;
let age=23;
let alias="King";
//undefined, null, null is used to clear the value of variable explicitly.
//{}are called the object literal
let person = {
    firstName,
    alias,
    age,
    isApproved
};
//select bracket or dot notation
console.log(person.firstName);
let selection="firstName";
person[selection]="John";
console.log(person);

//array literal
let selectedColors=['red','blue'];
console.log(selectedColors);


function greet(){
    console.log("Hello "+person.firstName);
}

greet();
//PArameter is the thing in the function, variable is the actual thing in the object, or passed in.
function rename(newName){
    person.firstName=newName;
}

rename(person.alias);

function square(number){
    return number*number;
}
let newNumber=square(2);

