//Calculate Sigfigs,
//A sigfig object should be declared as such,
    //toString() function returns numebr a sa string, 
    //or could figure out using a series of modulus operators.
    //mod 1, 10, 100, etc, and subtract them times the modulus from the running number.
    //Then store both the SigFig representation, and the 'given' value.
        //A range of values with a step would be nice to run the numbers in a table.


additionTable={
    "0":["0","1",  "2",  "3",  "4",  "5",  "6",  "7",  "8",  "9"],
    "1":["0","2",  "3",  "4",  "5",  "6",  "7",  "8",  "9",  "1,0"],
    "2":["0","3",  "4",  "5",  "6",  "7",  "8",  "9",  "1,0","1,1"],
    "3":["0","4",  "5",  "6",  "7",  "8",  "9",  "1,0","1,1","1,2"],
    "4":["0","5",  "6",  "7",  "8",  "9",  "1,0","1,1","1,2","1,3"],
    "5":["0","6",  "7",  "8",  "9",  "1,0","1,1","1,2","1,3","1,4"],
    "6":["0","7",  "8",  "9",  "1,0","1,1","1,2","1,3","1,4","1,5"],
    "8":["0","8",  "9",  "1,0","1,1","1,2","1,3","1,4","1,5","1,6"],
    "9":["0","9",  "1,0","1,1","1,2","1,3","1,4","1,5","1,6","1,7"],
    "9":["0","1,0","1,1","1,2","1,3","1,4","1,5","1,6","1,7","1,8"] 
}


function makeSigFig() {
    class SigFig{ 
        constructor(value=""){ //default is 0 so that the function can end quickly.
            this._originalValue=value;
            this._sigString=undefined;
            this._exp=undefined;
            this._sigValue=undefined;
            this._sigValueFront=undefined;
            this._sigValueBack=undefined;
            this.sigValue=value; //setter 
        } 
        set sigValue(value){
            if (typeof(value)!=typeof(String())){
                console.log(`converting value to string. ${value} is now ${String(value)}`)
                value=String(value)
            } 
            if (value.length==0){
                this._originalValue=""
                this._sigValue="0"
                this._sigValueBack=""
                this._sigValueFront="0"
                this._exp="0"
                this._sigString="0 * 10^0"
                return 
            }
            else {
                this._originalValue=value
                //remove leading 0's
                var headf=0
                while(headf<value.length && value[headf]=="0"){
                    headf+=1
                }
                if (headf<value.length){
                    value=value.substr(headf)
                    headf=0
                    while (headf<value.length && value[headf]!="."){
                        headf+=1
                    }
                    if (headf<value.length){
                        //decimal found
                        //console.log("Hm?")
                        //console.log(`Try getting front with 0 to ${headf} length, and back starting from ${headf+1}`)
                        var front=value.substr(0,headf) //changed from headf-1 to headf, start count at 0 yea? so it'd be 1 plus that
                        var back=value.substr(headf+1) 
                        //console.log("value front,back: "+front+"."+back) //quick check
                        if (front.length>0){
                            this._sigValue=front+"."+back
                            this._sigValueBack=back
                            this._sigValueFront=front
                            this._exp=front.length-1
                            this._sigString=`${this._sigValue} * 10^${this._exp}`
                            return
                        }
                        else {
                            var headb=0
                            while (headb<back.length && back[headb]=="0"){
                                headb+=1
                            }
                            if (headb<back.length){
                                this._sigValueFront=back[headb]
                                this._sigValueBack=back.substr(headb+1)
                                this._sigValue=this._sigValueFront+"."+this._sigValueBack
                                this._exp=-headb-1 
                                this._sigString=`${this._sigValue} * 10^${this._exp}`
                                return
                            }
                            else{
                                this._sigValueFront="0"
                                this._sigValueBack=back
                                this._sigValue=this._sigValueFront+"."+this._sigValueBack
                                this._exp=0
                                this._sigString=`${this._sigValue} * 10^${this._exp}`
                                return
                            }
                        } 
                    }
                    else{
                        if (value.length>1) {
                            this._sigValueFront=value[0]
                            this._sigValueBack=value.substr(1) 
                            this._exp=value.length-1  
                            this._sigValue=this._sigValueFront+"."+this._sigValueBack 
                        }
                        else {
                            if (value.length==1){
                                this._sigValueFront=value 
                            } else {
                                console.log("default values, empty input. Values chosen to minimize percieved accuracy/precision")
                                this._sigValueFront="0" 
                            } 
                            this._sigValueBack=""
                            this._sigValue=this._sigValueFront
                            this._exp=0
                        }
                        this._sigString=`${this._sigValue} * 10^${this._exp}`
                        return 
                    } 
                }
                else{ //deimal not found, all 0's
                    this._sigValueFront="0"
                    this._sigValueBack=""
                    this._exp=0
                    this._sigValue=this._sigValueFront
                    this._sigString=`${this._sigValue} * 10^${this._exp}`

                }  
            }  
        }
    }
    return SigFig
} 
function printSigFig(sigFig) {
    return `OG: ${sigFig._originalValue}, sigString: ${sigFig._sigString}`
}

function addSigFig(sig1, sig2){ 


}


var tester=makeSigFig()
//SigFig will store everything as a string since Number rounds way to much and at odd places
    //Thus in the future if someone wants to limit the amount of memory their values may take up, they should impose a MAX SIGFIG constant, that will round either back or front [if there is no back, or front itself is larger] 
        //to an appropriate value, and report to the user the new value being used when passed. This constant may be placed in the MakeSigFig function as an optional argument, with default as 20.

console.log(printSigFig(new tester("0")))//expect 0 * 10^0
console.log(printSigFig(new tester("0.")))//expect 0. *10^0
console.log(printSigFig(new tester("00")))//expect 0 * 10^0
console.log(printSigFig(new tester("0.0")))//expect 0.0 *10^0
console.log(printSigFig(new tester("00.0")))//expect 0.0 *10^0
console.log(printSigFig(new tester(".00")))//expect 0.00 *10^0
console.log(printSigFig(new tester("0.00")))//expect 0.00 *10^0
console.log(printSigFig(new tester("00.00")))//expect 0.00 *10^0
console.log(printSigFig(new tester("1")))//expect 1 *10^0
console.log(printSigFig(new tester("1.")))//expect 1. *10^0


console.log(printSigFig(new tester("1.1")))//expect 1.1 *10^0   
console.log(printSigFig(new tester("01.1")))//expect 1.1 *10^0  
console.log(printSigFig(new tester("1.10")))//expect 1.10 *10^0  
console.log(printSigFig(new tester("01.10")))//expect 1.10 *10^0
console.log(printSigFig(new tester("001.100")))//expect 1.100 *10^0
console.log(printSigFig(new tester("101.1000009")))//expect 1.01000009 *10^-2 <-BAD, did not adjust the decimal place properly
console.log(printSigFig(new tester(".010")))//expect 1.0 *10^2
