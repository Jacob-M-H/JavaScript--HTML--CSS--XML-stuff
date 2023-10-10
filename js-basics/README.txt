node 20.5.1
https://www.youtube.com/watch?v=W6NZfCO5SIk following tutorial with PRogramming with Mosh.
Goal is to learn JS.

JS then HTML(5), then CSS, then XML
Create a website that displays a tree diagram or a syntax hierarchy for a script.
Really just show a tree diagram, or words in a hierarchy.
An in box, and out box. color text, or box it.
A Tree doesn't need to have a tree image, just line by line.

The tokenization isn't clear yet, need to read chomsky and bnf stuff.

line server : https://www.youtube.com/watch?v=ZfCi0Is9gLU 
See code changes as you update your code in a web browser... 
https://www.youtube.com/watch?v=_wue59ldqMg local live server in vs code.
https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer#:~:text=Shortcuts%20to%20Start%2FStop%20Server&text=Open%20the%20Command%20Pallete%20by,Server%20to%20stop%20a%20server. 
shortcuts to start and stop.


10/4/23
    Python started the parsing, so that this project can be done simpler, and then we can port or pass information between JS and the python modules.
    [If that becomes an interest]. 
    For now the goal is to learn JS more, and HTML/CSS so that I can move onto React or Node. 


NOTE: To see javascript in action through VS code, R-Click an html file, and open with Live Server.
NOTE: To see console within this window, rightclick and open the console [inspect usually]



JS types:
    Undefined, null, boolean, string, symbol, number, and object.
    Symbol: Immutable primitive value that is unique
    object: lots of key value pairs.
    Strings are immutable

NOTE: Let does not allow you to declare it twice, var does. Does allow you to reassing it whenever.
NOTE: "use strict"; at the top of a function/scope, it will warn you of unsafe stuff, like a variable not declared with let or var.
NOTE: Let also respects scoping. Var will act like a global and will change in lower scopes if used in those lower scopes.
NOTE: Var will also retain it's definition outside of it's scope [like in a function if statement var i=5, will still be i=5 outside of that if statement]
    NOTE: So let is good for declaring one thing once and in the scope it wants. Var persists beyond it's smaller scope, and can be decalred multiple times.
    Note: Some experimentation is needed to see if the var persisting happens outside of a function, instead of just persisting outside of an if statement. Let is used for using a variable only in the area they want to.

//Same function
var magic = function() {
    return new Date();
}
var magic2 = ()=> {
    return new Date();
}
var magic3 = () => new Date(); 


Note, I don't like how I think functions may be stored in objects as variables, and the multiple different ways of 'holding' a function, in a variable or as a function declaration, or as an abstract. In that case, I think let is useful for maintaining the function, but I'm unsure.
Reminds me a bit of functional programming tbh.


Note, every line ends in a semi-colon. Note everything should usually be thought of as members. Note there doesn't seem to be forward declaring types, so there is a need to type check.
Note, it seems that : and = can be used interchangbly. Note that var is the friendliest for testing, and let/const aren't easy, until we know how ot reinitialize the console.
Note, a class cannot have more than one constructor() method. {GARBO}
Read https://medium.com/young-coder/supporting-multiple-constructors-in-javascript-48cab12264ed later
Note javascript if statements assume 1 'statement', so always close with ().
Note '^' is the XOR operator [very strange!]

//JS Numbers are double precision floats. Follows IEEE 754 standard.
//I won't worry about the precision for now, since later I can research the IEEE format if I really want something hefty.
    //I 'should' put guard rails based on the IEEE limitations of precision/accuracy, and knock off SigFigs up to whats affected by operations, but again more research is required there.

//JS Number(".000010000000000010115"), 
    //Note that the '5' is interpreted as a '4'... Thus limit on the 'back' of a user input should be 1- the length of this [without a decimal]
//JS Number("1.0000111111111111")
    //the last value is interpreted as a '2', thus if front is more than 0, we serverely cut the amount.
    //also if you replace 1 wit ha 7 or 8, then even if the back is one less it rounds to a different value than 1.. odd!

Note if white ... appear on a variable, I likely forgot a var,let, or const statement.
Word of note, the double precision numbers have a maximum range, but it doesn't seem to attempt to stop you from using beyond that? More research on that behavior seems good to try, since it'll bite me otherwise.

Note also that functions stored will retain their functionality even if the expression is changed later [unless accessed via that value storing it]. This is because the function exists not as a reference, but as a value. Good to know.



10/10/23
    Note on sigfigs. I kept them as strings as I would like to keep precision without having to make an IEEE standard myself.
    I thought of initially doing an addition table, and hold a remainder, but then division doesn't see easily done. I may have to write some math stuffs to try and figure out a 'remainder' division problem.
    That, or figure out the maximum distance of digits I would want to keep. 
    Addition at most adds 1 digit place, multiplication adds at most the combined length of the inputs minus 1. And subtraction removes elements [usually] or holds similar properties to addition.
    Division however doesn't have a trend like this due to irrational numbers.
    JavaScript numbers are wonky, as noted above, so I'll try for now to think of a solution, or find someone elses solution.