var myName="Jacob" //var let's you reuse the variable at any point (global?)
myName="King"
let lastName="Hilst" //only valid within scope of where declared
const pi=3.14 

//Capitalizations matter [camel case conventoin]
var myDecimal=0.00057 //What is the limit on the precision?
//Remainder symbol : %, additionally *=, \=, -=, and += are valid. pi/=3 is pi=pi/3
// escape character : \, so \", and \n are like C++
    //additionally if you start with single quotes, then double's are already considered escaped.
    //Backticks also work which allow double and single quotes. 
//escapes: \',\",\\,\n,\r,\t,\b,\f [newline, carriage return, tab, backspace, form feed]

console.log(myName.length) //expect 5
console.log("First letter of "+myName+" is "+myName[0]) 
console.log(myName+" sliced(0,3): "+myName.slice(0,3))//Python convention 0 up until but not including 3.

//Strings are immutable
var myArray=[myName, lastName, pi]
myArray[0]="Jacob"
myArray.push("Chaos") //append
myArray.shift() //Remove first element
myArray.unshift("Jacob") //add element to beginning
myArray.pop() //remove last element
//typeof gives the type returns a string I think?
console.log(typeof myName)

function addition(a,b){
    a=Number(a)
  	b=Number(b)
	  if (isNaN(a) || isNaN(b)) {
        throw Error("Expected two numbers")
    }
    return a+b
}


//NOTE: comparision with strictly equal. 
    // 3==3 and 3=='3' (True), 3==='3' , so == does type conersion, but === is false
    //!= inequality symbol, !== strict inequality, no conersion of types.
//Note switch(val){ case 1 [uses strict equality]: , then break, or it will continue through the cases.} 


//Object
var studyTime ={
    "Python": 1,
    "C++": 2,
    "JS":.5,
    "Java":1

}

console.log(studyTime.Python)
console.log(studyTime[0])
console.log(studyTime["Python"])
delete studyTime["C++"]
console.log(studyTime) //removes c++ property
//Objects are like a key value dictionary 
//Objects use {}, arrays []
var collection={
    "Current Work":{
        type: "Programming",
        list: [
            "C++",
            "Python",
            "JS",
            "Java"
        ]
    },
    "Future Work":{
        type:"Future Programming",
        list: [
            "Website",
            "React/Node.js",
            "Java Paint",
            "Py Math/Symbol Graph",
            "C++ Windows OS Watcher",
            "Python/Java Image/Sound Application",
            "AI Applications from Textbook"
        ]
    },
    "Hobbies":{
        type:"Old Hobbies",
        list: [
            "Metal Gear",
            "Yugioh",
            "Webnovels",
            "ElderScrolls",
            "Souls-likes",
            "LEGOs",
            "Art Appreciation"
        ]
    }
}
var copyCollection= JSON.parse(JSON.stringify(timeSpent)) 
function updateRecords(id, prop, value){
    if (value===""){
        delete collectionp[id][prop];
    }
    else if (prop==="list"){
        collection[id][prop] = collection[id][prop] || [];  
        collection[id][prop].push(value)

    }else{
      	collection[id]=collection[id] || {}
        collection[id][prop]=value
    }

    return collection;
}
console.log(copyCollection)
updateRecords("Current Work", "list", "SQL")
updateRecords("Current Work", "type", "Programming Practice")
console.log(collection) 
updateRecords("Negative Emotion", "type", "Emotion")
updateRecords("Negative Emotion", "list", "Anxiety")
updateRecords("Negative Emotion", "list", "Stress")
console.log(collection) 

//Loops
var numArray=[];
i=0
alter=false
while (i<5){
    if (alter) {
        numArray.push(i)       
    } else{ 
        numArray.unshift(i)
    } 
    alter = !alter  
    i++
}
console.log(numArray)
//for loops are similar to python, java, and c++, for(var i=1; i<5; i++){}


function randomFraction(){
    return Math.random();
}
console.log(randomFraction())
function randomRangeNum(floor, ceil){
    floor=Number(floor)
    ceil=Number(ceil)
    if (isNaN(floor) || isNaN(ceil)){
        throw Error("Expected two numbers")
    }
    else if (floor>ceil){
        temp=ceil
        ceil=floor
        floor=temp
    } else if (floor==ceil) {
        throw Error("Expected two different numbers")
    }

    //expect values between floor and ceil inclusive
    let value=Math.floor(Math.random()*(ceil-floor+1))+floor //between 0 and 19, as random is between 0 and 1 non inclusive. Round down gets 0-19.

    return (value)
}

function convertToInteger(str, base){
    //binary is base 2
    return parseInt(str, base)
}

function checkEqual(a,b){
    return a===b ? true:false; //Example of Ternary operator
}

//NOTE: More advanced Syntax, quite different from other languages
const s =[1,2,3]
s[0]=2
s[1]=5
s[2]=7
//Const s keeps s from having it's memory expanded or removed, but does allow it to be mutated still
//Object.Freeze prefents this.
freezeObj(s)
try {
    s[0]=3
} catch (ex){
    console.log(ex)
}

//Same function
var magic = function() {
    return new Date();
}
var magic2 = ()=> {
    return new Date();
}
var magic3 = () => new Date(); //suggest const to preserve it's functionaility

//When one function takes another function as an argument, good time to use arrow function
const realNumArray=[4,5.6,-9.8, 3.14, 42, 6, 8.34, -2]
const squareList = (arr) => {
    //keep only values in the array that fit the filter, 
    const integerArr=arr.filter(num => Number.isInteger(num) && num>0)
    const squaredIntegers = integerArr.map(x => x*x) //x in map is just means every element in the array will be passed through the function [similar to lambda in python]
    return squaredIntegers
}

//Note, I don't like how I think functions may be stored in objects as variables, and the multiple different ways of 'holding' a function, in a variable or as a function declaration, or as an abstract. In that case, I think let is useful for maintaining the function, but I'm unsure.
var increment=(function() {
    return function increment(number, value=1){
        return number+ value
    }
})



//Rest Operator - allows you to create a function that takes in a variable number of arguments

const sum = (function() {
    return function sum(x,y,z) {
        const args=[x,y,z];
        return args.reduce((a,b) => a + b, 0);
    }
})

console.log(sum(1,2,3))
//Rest operator example, the ... creates all parameters into an array called args
const sum2 = (function() {
    return function sum(...args) { 
        return args.reduce((a,b) => a + b, 0);
    }
})

console.log(sum(1,2,3,4))


//spread operator - spreads out an existing array, into it's individual parts
    //NOTE: looks like reset operator, only can be used in an argument to a function or an array literal.
const arr1=['jan','feb', 'mar', 'apr', 'may']
let arr2;
(function () {
    arr2=arr1 //chnage this line (THIS MAKES THEM THE SAME OBJECT)
    arr1[0]='potato'
})
console.log(arr2) 

const arr3=['jan','feb', 'mar', 'apr', 'may']
let arr4;
(function () {
    arr4=[...arr1] //QUESTION: Does it deep copy objects inside? or is this a shallow copy?
    arr3[0]='potato' //ANSWER IT MAKES A DEEP COPY (Awesome!)
})
console.log(arr2) 


//destructuring assignment
var voxel = {x:3.6, y:7.4, z:6.54}
//old way
var x =voxel.x
var y =voxel.y
var z =voxel.z
//new way, copies value1 into : value 2 from } = voxel's value1s
const {x: a, y:b, z:c} = voxel;
const Avg_temp={
    today: 77.5,
    tomorrow:79
}
function getTempOfTmrw(Avg_temp){
    "use strict";
    const{tomorrow: tempOfTomorrow}=Avg_temp
    return tempOfTomorrow
}
console.log(getTempOfTmrw(Avg_temp))
//destructuring nested objects
const LOCAL_FORCAST={
    today: {min: 77.5, max:83},
    tomorrow: {min: 73.3, max:84.6}
}

function getMaxOfTmrw(forecast){
    "use strict";
    //Get from forecast, tomorrow, max, and plaec in getMaxOfTomorrow
        //destructures twice
    const { tomorrow : {max : getMaxOfTomorrow}} = forecast;
    return maxOfTomorrow
}
console.log(getMaxOfTmrw(LOCAL_FORCAST))

//destructure to assign variables from arrays.
const [zb,xb]=[1,2,3,4,5,6]; //try [z,x, , y], see 1,2, and 4.
console.log(zb,xb) //assigned 1,2 <-difference from destruct array and objects is cannot specify which element from array goes into variable. 

let ab=8, bb=6;
(() => { //Swap values
    "use strict";
    [a,b]=[b,a]
}) (); //What kind of structure is this? It's a function but not clear to me what some thigns mean.
console.log(ab)
console.log(bb)

const source=[1,2,3,4,5,6,7,8,9,10]
function removeFirstTwo(list){
    const [, , ...arr] = list;
    return arr
}
const arr=removeFirstTwo(source);
console.log(arr)
console.log(source)

//Example of destruction assignment <-this is kinda bonkers
const stats={
    max : 56.78,
    sDev: 4.34,
    med : 34.54,
    mode: 23.87,
    min :- 0.75,
    avg : 35.58
}
const half=(function() {
    return function half({max, min}){ //NOTE comonly used for API requests to only pass whats needed
        return (max+min)/2.0
    }
})
console.log(stats)
console.log(half(stats))

//Template Litearls, makes compelx strings easier
const person={
    name: "Jake H",
    age:23
}
const greeting=`hello, my name is ${person.name}! I am ${person.age} years old.`;
console.log(greeting)
const result={
    success:["max-length", "no-and", "prefer-arrow-functions"],
    failure:["no-var","var-on-top","linebreak"],
    skipped: ["id-blacklist", "no-dup-keys"]
}
function makeList(arr){
    const resultDisplayArray=[];
    for (let i =0; i<arr.length; i++){
        resultDisplayArray.push(`<li class="text-warning"> ${arr[i]} <"/li>`)
    }
    return  resultDisplayArray
}
/**
 * makeLisT(result.failure) should return:
 * [ `<li class="text-warning">no-var</li>`,
 *   `<li class="text-warning">var-on-topr</li>`
 *   `<li class="text-warning">linebreak</li>`]
 */
resultDisplayArray=makeList(result.failure)
console.log(resultDisplayArray)

//write concise object literal declarations using simple fields
const createPerson=(name,age,gender)=> { //NOTE, thisi s like an intiializer!
    return {
        name: name,
        age: age,
        gender: gender
    }
}
const createPerson2=(name,age,gender)=> { 
    //If you know the name of the value and paramter will be the same
        //where the name of the key is the name of the value,
    {name, age, gender} //returns object pairs {name:name, age:age, gender:gender}
}
console.log(createPerson("Jacob", 23, "male"))


//DECLARATIVE FUNCTIONS
const bicycle={
    gear:2,
    setGear(newGear){ //instead of using setGear:function(newGear)
        "use strict";
        this.gear=newGear; //This makes me calm down a bit more!
    }
}

//CLASS SYNTAX
//older way to make objects use a 'new' keyword, would have a constructor function
var SpaceShuttle=function(targetPlanet){
    this.targetPlanet=targetPlanet
}
var zeus=new SpaceShuttle('Jupiter')
console.log(zeus.targetPlanet)
//New way
class SpaceShuttle {
    constructor(targetPlanet){
        this.targetPlanet=targetPlanet;
    }
}
var zeus=new SpaceShuttle('Jupiter')
console.log(zeus.targetPlanet)

function makeClass(){
    class Veggie {
        constructor(name){
            this.name=name;
        }
    }
    return Veggie
}
const Vegetable=makeClass();
const carrot=new Vegetable('carrot')
console.log(carrot.name)

//GETTERS AND SETTERS to control access to an object
class Book {
    constructor(author){
        this._author=author;
    }
    //getter
    get writer(){
        return this._author
    }
    //setter
    set writer(updatedAuthor){
        this._author=updatedAuthor
    }
}
function makeClass(){
    class Thermostat{
        constructor(temp){
            this._temp=(temp-32)*5/9 //NOTE underscore signifies is private

        }
        get temperature(){
            return this._temp;
        }
        set temperature(updatedTemp){
            this._temp=updatedTemp
        }
    }
    return Thermostat;//accempt Farenheight, getter and setter to obtain celceuius
}
const Thermostat=makeClass();
const thermos=new Thermostat(76)
let temp=thermos.temperature
console.log(temp)
temp=thermos.temperature
console.log(temp)

//UNDERSTAND DIFFERENCE BETWEEN IMPORT AND EXPORT
    //in another file, have 'export' keyword for a variable which may be set to a function
import { capitalizeString } from "./sandBoxExportExample"
const cap=capitalizeString("hello!")
console.log(cap)
//Use export to reuse a code block
import * as exportExampleStuff from "./sandBoxExportExample"
console.log(exportExampleStuff.foo, exportExampleStuff.bar)

//CREATE AN EXPORT FALLBACK WITH EXPORT DEFAULTS
    //before named exports, and theres something called an export default, a fallback default used if you only want to export one thing
    //Import a default export
import subtract from "./sandBoxExportDefault" //if default, don't use curly brackets
console.log(subtract(7,4))




//This took awhile -_-
function makeObj(str1, str2){
    class ObjTest { 
      constructor(str1, str2) {
                  this._str1=0,
            this._str2=0;
            var expectedLength=5;
            if (str1.length<expectedLength) {
                      this._str1="default";
            } else{
              this._str1=str1;
            }
                if (str2.length>expectedLength) {
              this._str2="error";
            } else {
              this._str2=str2;
            }
      } 
      
    }
    return new ObjTest(str1, str2)
  }
  
  var testmaker=makeObj
  var test1=new testmaker("matt", "everglade") //fails both
  console.log(test1._str1, test1._str2)