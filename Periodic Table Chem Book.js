

//These two will be used later, when we have more impircal statements on the elements
class Unknown{
    constructor(){ 
        _note="This value is unknown"
    }
    get note(){
        this._note
    }
    set note(str){
        this._note=str
    }
}
class notApplicable{
    constructor(){ 
        _note="This value is non-Applicable"
    }
    get note(){
        this._note
    }
    set note(str){
        this._note=str
    }
}

//tomorrow we need to make a SigFig function
    //And more importantly the groupings, the series. Already started but is it possible to belong to two groups? Or how do the subgroupings work?
    

function makeElement(){
    class Element {
        constructor(constantList, 
                    seriesInfoList=undefined){ //put in arguments
            //this._temp=temp
            var expectedLengthConstantList=6;
            if (constantList!=undefined && constantList.length==expectedLengthConstantList){
                this._ELEMENT_NAME=constantList[0];
                this._ELEMENT_SYMBOL=constantList[1];
                this._DISCOVERED=constantList[2];
                this._RELATIVE_ATOMIC_MASS=constantList[3]; 
                this._ATOMIC_NUMBER=constantList[4]; //# Protons==Electrons [in neutral charge]. Neutrons are subject to chagne
                this._PERODIC_ROW=constantList[5][1];
                this._PERODIC_COLUMN=constantList[5][0];
            } else{
                console.log(constantList)
                if (constantList==undefined) {
                    throw Error("Expected at least an elements immutable values");
                } else{
                    throw Error(`Expected at least ${expectedLengthConstantList} values in constantList`);
                }
            }
 

            this._STABLE_ISOTOPES=undefined //push an object of neutron:abundance values.
            this._UNSTABLE_ISOTOPES=undefined;
            this._is_stable=undefined; 


            //Remove everything that isn't consistent across elements
                    //Then we will have a seperate class hold isotopic information

            //#region Series
            this._seriesShortHand=undefined; //the array to be kept
            this._IS_Metal=undefined;
                    this._IS_Lathanoid=undefined;
                    this._IS_Actinoid=undefined;
                    this._IS_AlkalineEarthMetal=undefined;
                    this._IS_AlkaliMetal=undefined;
                    this._IS_PostTransitionMetal=undefined;
                    this._IS_TransitionMetal=undefined;
            
            this._IS_Metalloid=undefined;

            this._IS_Nonmetal=undefined;
                this._IS_ReactiveNonMetal=undefined;
                this._IS_NobleGas=undefined;

             
            
            try {
                this.series=seriesInfoList;
            }
            catch (error) {
                console.log(error);
            } 
             
        }

      
        set series(seriesList){
            var expectedLengthSeriesInfoList=3;
            var expectedLengthSeriesInfoListMetals=7;
            var expectedLengthSeriesInfoListMetalloids=1;
            var expectedLengthSeriesInfoListNonmetals=3;
            if (seriesInfoList!=undefined && seriesInfoList.length==expectedLengthSeriesInfoList
            && seriesList[0].length==expectedLengthSeriesInfoListMetals 
            && seriesList[1].length==expectedLengthSeriesInfoListMetalloids 
            && seriesList[2].length==expectedLengthSeriesInfoListNonmetals) {
                //categories -boolean
                this._IS_Metal=seriesList[0][0];
                    this._IS_Lathanoid=seriesList[0][1];
                    this._IS_Actinoid=seriesList[0][2];
                    this._IS_AlkalineEarthMetal=seriesList[0][3];
                    this._IS_AlkaliMetal=seriesList[0][4];
                    this._IS_PostTransitionMetal=seriesList[0][5];
                    this._IS_TransitionMetal=seriesList[0][6];
            
                this._IS_Metalloid=seriesList[1][0];

                this._IS_Nonmetal=seriesList[2][0];
                    this._IS_ReactiveNonMetal=seriesList[2][1];
                    this._IS_NobleGas=seriesList[2][2];
                
                this._seriesShortHand=seriesList;

            } else {
                if (seriesList.length!=expectedLengthSeriesInfoList) {
                    throw Error(`Expected at least ${expectedLengthSeriesInfoList} subLists in seriesInfoList`);
                }
                else if (seriesList[0].length!=expectedLengthSeriesInfoListMetals ){
                    throw Error(`Expected at least ${expectedLengthSeriesInfoListMetals} values in Metals series,
                     [is_metal, is_lathanoid, is_actinoid, is_AlkalineEarthMetal, is_alkaliMetal, is_post-transitionalMetal,
                    is_transitionMetal]`);
                }
                else if (seriesList[1].length!=expectedLengthSeriesInfoListMetalloids ){
                    throw Error(`Expected at least ${expectedLengthSeriesInfoListMetalloids} values in Metals series, [is_metalloid]`);
                }
                else if (seriesList[2].length!=expectedLengthSeriesInfoListNonmetals ){
                    throw Error(`Expected at least ${expectedLengthSeriesInfoListNonmetals} values in Metals series,
                     [is_nonmetal, is_reactiveNonmetal, is_nobleGas]`);
                } 
            }
            
        }
        
        //protons
        get protonCount(){
            return this._ATOMIC_NUMBER;
        }
        get atomicNumber(){
            return this._ATOMIC_NUMBER;
        }
        get relativeAtomicMass(){
            return this._RELATIVE_ATOMIC_MASS;
        }
        get weight(){
            return this._RELATIVE_ATOMIC_MASS;
        }

        get series(){
            if (this._seriesShortHand!=undefined){
                report="";
                if (this._IS_Metalloid==true){
                    report+="Metaloid.";
                }            
                if (this._IS_Nonmetal){
                    report+="NonMetal: ";
                    if (this._IS_ReactiveNonMetal){
                        report+="Reactive Non-Metal, ";
                    }
                    if (this._IS_NobleGas){
                        report+="Noble Gas, ";
                    }
                }
                if (this._IS_Metal){
                    if (this._IS_Lathanoid){
                        report+="Lathanoid, ";
                    }
                    if (this._IS_Actinoid){
                        report+="Actinoid, ";
                    }
                    if (this._IS_AlkalineEarthMetal){
                        report+="Alkaline Earth Metal, ";
                    }
                    if (this._IS_AlkaliMetal){
                        report+="AlkaliMetal, ";
                    }
                    if (this._IS_PostTransitionMetal){
                        report+="Post-Transition Metal, ";
                    }
                    if (this._IS_TransitionMetal){
                        report+="Transition Metal, ";
                    }
                }
                return report;
            } else{
                return "undefined";
            }
        }

    }
    return Element; //this way we can rename the function if need be, and have different constroctors
}

function makeIsotope(){
    class Isotope{
        constructor(isoNumber, element){
            this._ISONUMBER=isoNumber
            this._ELEMENT=element
            //should have a check about types, and that it's valid isotope.
        }
        get neutronCount(){
            return this.isoNumber-this._ELEMENT.protonCount
        }


    }
}


/** 
 * this._IS_Metal=seriesList[0][0],
        this._IS_Lathanoid=seriesList[0][1],
        this._IS_Actinoid=seriesList[0][2],
        this._IS_AlkalineEarthMetal=seriesList[0][3],
        this._IS_AlkaliMetal=seriesList[0][4],
        this._IS_PostTransitionMetal=seriesList[0][5],
        this._IS_TransitionMetal=seriesList[0][6],

    this._IS_Metalloid=seriesList[1][0],

    this._IS_Nonmetal=seriesList[2][0],
        this._IS_ReactiveNonMetal=seriesList[2][1],
        this._IS_NobleGas=seriesList[2][2] 
*/



//57-71 is lanthanides
//89-103 are actinides


const Element=makeElement()
/* Example of what I desire later. Used https://ptable.com/?lang=en#Properties/Discovered
const H=new Element(["Hydrogen","H", "1766AD", 1.008, 1, (1,1)], //(col, row)
[[false, false, false, false, false, false, false],[false],[true, true, false]], //Series, if [0] is false, then no need to check the rest (I think)
[0, "solid"],//start temp, state
1, 2.20, //energy levels, electronegativity
[14.01, 20.28], //melting, boiling
[72.8, [1312.0, NaN,NaN,NaN,NaN,
        NaN,NaN,NaN,NaN,NaN,
        NaN,NaN,NaN,NaN,NaN,
        NaN,NaN,NaN,NaN,NaN,
        NaN,NaN,NaN,NaN,NaN,
        NaN,NaN,NaN,NaN,NaN]], //electron affinity, and ionization 1-30th
[53,25,37,120], //radius
[NaN,NaN,NaN], //hardness
[NaN,NaN,NaN], //modulus
[0.0899, NaN], //density STP and liquid
[0.1805, NaN], //conductivity thermal, electric
[14300, 0.452, 0.558], //heat, specific, vapor, and fusion
[75, 75, 2.4, .15,11,10] //abundance, universe, solar, meteor, crust, ocean, human 
)  
*/
//For elements with no stable isotopes, the mass number of isotope with longest half-life is used in paraenthesis!

//14 arguments
const H=new Element(["Hydrogen","H", "1766AD", 1.008, 1, (1,1)],[[0, 0,0,0,0,0,0], [0], [1, 1,0]]);
const He=new Element(["Helium", "He", "1895 AD", 4.0026, 2, (18,1)],[[0, 0,0,0,0,0,0], [0], [1, 0,1]]);
const Li=new Element(["Lithium", "Li", "1817 AD", 6.94, 3, (1,2)],[[1, 0,0,0,1,0,0], [0], [0, 0,0]]);
const Be=new Element(["Beryllium", "Be", "1797 AD", 9.0122, 4, (2,2)],[[1, 0,0,1,0,0,0], [0], [0, 0,0]]);
const B=new Element(["Boron", "B", "1808 AD", 10.81, 5, (13,2)],[[0, 0,0,0,0,0,0], [1], [0, 0,0]]);
const C=new Element(["Carbon", "C", "3759 BC", 12.011, 6, (14,2)],[[0, 0,0,0,0,0,0], [0], [1, 1,0]]);
const N=new Element(["Nitrogen", "N", "1772 AD", 14.007, 7, (15,2)],[[0, 0,0,0,0,0,0], [0], [1, 1,0]]);
const O=new Element(["Oxygen", "O", "1774 AD", 15.999, 8, (16,2)],[[0, 0,0,0,0,0,0], [0], [1, 1,0]]);
const F=new Element(["Flourine", "F", "1886 AD", 18.998, 9, (17,2)],[[0, 0,0,0,0,0,0], [0], [1, 1,0]]);
const Ne=new Element(["Neon", "Ne", "1898 AD", 20.180, 10, (18,2)],[[0, 0,0,0,0,0,0], [0], [1, 0,1]]);
const Na=new Element(["Sodium", "Na", "1897 AD", 22.990, 11, (1,3)],[[1, 0,0,0,1,0,0], [0], [0, 0,0]]);

const Mg=new Element(["Magnesium", "Mg", "1755 AD", 24.305, 12, (2,3)],[[1, 0,0,1,0,0,0], [0], [0, 0,0]]);
const Al=new Element(["Aluminium", "Al", "1825 AD", 26.982, 13, (13,3)],[[1, 0,0,0,0,1,0], [0], [0, 0,0]]);
const Si=new Element(["Silicon", "Si", "1824 AD", 28.085, 14, (14,3)],[[0, 0,0,0,0,0,0], [1], [0, 0,0]]);
const P=new Element(["Phosphorus", "P", "1669 AD", 30.974, 15, (15,3)],[[0, 0,0,0,0,0,0], [0], [1, 1,0]]);
const S=new Element(["Sulfer", "S", "500 BC", 32.06, 16, (16,3)],[[0, 0,0,0,0,0,0], [0], [1, 1,0]]);
const Cl=new Element(["Chlorine", "Cl", "1774 AD", 35.45, 17, (17,3)],[[0, 0,0,0,0,0,0], [0], [1, 1,0]]);
const Ar=new Element(["Argon", "Ar", "1894 AD", 39.948, 18, (18,3)],[[0, 0,0,0,0,0,0], [0], [1, 0,1]]);
const K=new Element(["Potassium", "K", "1807 AD", 39.098, 19, (1,4)],[[1, 0,0,0,1,0,0], [0], [0, 0,0]]); //Check the atomic weight of this here..

const Ca=new Element(["Calcium", "Ca", "1808 AD", 40.078, 20, (2,4)],[[1, 0,0,1,0,0,0], [0], [0, 0,0]]);
const Sc=new Element(["Scandium", "Sc", "1879 AD", 44.956, 21, (3,4)],[[1, 0,0,0,0,0,1], [0], [0, 0,0]]);
const Ti=new Element(["Titanium", "Ti", "1791 AD", 47.867, 22, (4,4)],[[1, 0,0,0,0,0,1], [0], [0, 0,0]]);
const V=new Element(["Vanadium", "V", "1801 AD", 50.942, 23, (5,4)],[[1, 0,0,0,0,0,1], [0], [0, 0,0]]);
const Cr=new Element(["Chromium", "Cr", "1797 AD", 51.996, 24, (6,4)],[[1, 0,0,0,0,0,1], [0], [0, 0,0]]);
const Mn=new Element(["Manganese", "Mn", "1774 AD", 54.938, 25, (7,4)],[[1, 0,0,0,0,0,1], [0], [0, 0,0]]);
const Fe=new Element(["Iron", "Fe", "2000 BC", 55.845, 26, (8,4)],[[1, 0,0,0,0,0,1], [0], [0, 0,0]]);
const Co=new Element(["Cobalt", "Co", "1735 AD", 58.933, 27, (9,4)],[[1, 0,0,0,0,0,1], [0], [0, 0,0]]);
const Ni=new Element(["Nickel", "Ni", "1751 AD", 58.693, 28, (10,4)],[[1, 0,0,0,0,0,1], [0], [0, 0,0]]);
const Cu=new Element(["Copper", "Cu", "8000 BC", 63.546, 29, (11,4)],[[1, 0,0,0,0,0,1], [0], [0, 0,0]]);
const Zn=new Element(["Zinc", "Zn", "1500 AD", 65.38, 30, (12,4)],[[1, 0,0,0,0,0,1], [0], [0, 0,0]]);
const Ga=new Element(["Gallium", "Ga", "1875 AD", 69.723, 31, (13,4)],[[1, 0,0,0,0,1,0], [0], [0, 0,0]]);
const Ge=new Element(["Germanium", "Ge", "1886 AD", 39.098, 32, (14,4)],[[0, 0,0,0,0,0,0], [1], [0, 0,0]]);
const As=new Element(["Arsenic", "As", "1250 AD", 39.098, 33, (15,4)],[[0, 0,0,0,0,0,0], [1], [0, 0,0]]);
const Se=new Element(["Selenium", "Se", "1817 AD", 39.098, 34, (16,4)],[[0, 0,0,0,0,0,0], [1], [0, 0,0]]);
const Br=new Element(["Bromine", "Br", "1826 AD", 39.098, 35, (17,4)],[[0, 0,0,0,0,0,0], [0], [1, 1,0]]);
const Kr=new Element(["Krypton", "Kr", "1898 AD", 39.098, 36, (18,4)],[[0, 0,0,0,0,0,0], [0], [1, 0,1]]);
const Rb=new Element(["Rubidium", "Rb", "1861 AD", 39.098, 37, (1,5)],[[1, 0,0,0,1,0,0], [0], [0, 0,0]]);

const Sr=new Element(["Strontium", "Sr", "1790 AD", 87.62, 38, (2,5)],[[1, 0,0,1,0,0,0], [0], [0, 0,0]]);
const Y=new Element(["Yttrium", "Y", "1794 AD", 88.906, 39, (3,5)],[[1, 0,0,0,0,0,1], [0], [0, 0,0]]);
const Zr=new Element(["Zirconium", "Zr", "1789 AD", 91.224, 40, (4,5)],[[1, 0,0,0,0,0,1], [0], [0, 0,0]]);
const Nb=new Element(["Niobium", "Nb", "1801 AD", 92.906, 41, (5,5)],[[1, 0,0,0,0,0,1], [0], [0, 0,0]]);
const Mo=new Element(["Molybdenum", "Mo", "1781 AD", 95.95, 42, (6,5)],[[1, 0,0,0,0,0,1], [0], [0, 0,0]]);
const Tc=new Element(["Technetium", "Tc", "1937 AD", (98), 43, (7,5)],[[1, 0,0,0,0,0,1], [0], [0, 0,0]]); //What does the (98) mean, differ from 98?
const Ru=new Element(["Ruthenium", "Ru", "1844 AD", 101.07, 44, (8,5)],[[1, 0,0,0,0,0,1], [0], [0, 0,0]]);
const Rh=new Element(["Rhodium", "Rh", "1803 AD", 102.91, 45, (9,5)],[[1, 0,0,0,0,0,1], [0], [0, 0,0]]);
const Pd=new Element(["Palladium", "Pd", "1803 AD", 106.42, 46, (10,5)],[[1, 0,0,0,0,0,1], [0], [0, 0,0]]);
const Ag=new Element(["Silver", "Ag", "3000 BC", 107.87, 47, (11,5)],[[1, 0,0,0,0,0,1], [0], [0, 0,0]]);
const Cd=new Element(["Cadmium", "Cd", "1817 AD", 112.41, 48, (12,5)],[[1, 0,0,0,0,0,1], [0], [0, 0,0]]);
const In=new Element(["Indium", "In", "1863 AD",114.82, 49, (13,5)],[[1, 0,0,0,0,1,0], [0], [0, 0,0]]);
const Sn=new Element(["Tin", "Sn", "3000 BC",118.71, 50, (14,5)],[[1, 0,0,0,0,1,0], [0], [0, 0,0]]);
const Sb=new Element(["Antimony", "Sb", "3000 BC", 121.76, 51, (15,5)],[[0, 0,0,0,0,0,0], [1], [0, 0,0]]);
const Te=new Element(["Tellurium", "Te", "1783 AD", 127.60, 52, (16,5)],[[0, 0,0,0,0,0,0], [1], [0, 0,0]]);
const I=new Element(["Iodine", "I", "1811 AD", 126.90, 53, (17,5)],[[0, 0,0,0,0,0,0], [0], [1, 1,0]]);
const Xe=new Element(["Xenon", "Xe", "1898 AD", 131.29, 54, (18,5)],[[0, 0,0,0,0,0,0], [0], [1, 0,1]]);
const Cs=new Element(["Caesium", "Cs", "1860 AD", 132.91, 55, (1,6)],[[1, 0,0,0,1,0,0], [0], [0, 0,0]]);

const Ba=new Element(["Barium", "Ba", "1808 AD", 137.33, 56, (2,6)],[[1, 0,0,1,0,0,0], [0], [0, 0,0]]);
//break for 57-71
const Hf=new Element(["Hafnium", "Hf", "1923 AD", 178.49, 72, (4,6)],[[1, 0,0,0,0,0,1], [0], [0, 0,0]]);
const Ta=new Element(["Tantalum", "Ta", "1802 AD", 180.95, 73, (5,6)],[[1, 0,0,0,0,0,1], [0], [0, 0,0]]);
const W=new Element(["Tungsten", "W", "1783 AD", 183.84, 74, (6,6)],[[1, 0,0,0,0,0,1], [0], [0, 0,0]]);
const Re=new Element(["Rhenium", "Re", "1925 AD", 186.21, 75, (7,6)],[[1, 0,0,0,0,0,1], [0], [0, 0,0]]);
const Os=new Element(["Osmium", "Os", "1803 AD", 190.23, 76, (8,6)],[[1, 0,0,0,0,0,1], [0], [0, 0,0]]);
const Ir=new Element(["Iridium", "Ir", "1803 AD", 192.22, 77, (9,6)],[[1, 0,0,0,0,0,1], [0], [0, 0,0]]);
const Pt=new Element(["Platinum", "Pt", "1735 AD", 195.08, 78, (10,6)],[[1, 0,0,0,0,0,1], [0], [0, 0,0]]);
const Au=new Element(["Gold", "Au", "2500 BC", 196.97, 79, (11,6)],[[1, 0,0,0,0,0,1], [0], [0, 0,0]]);
const Hg=new Element(["Mercury", "Hg", "1500 BC", 200.59, 80, (12,6)],[[1, 0,0,0,0,0,1], [0], [0, 0,0]]);
const Tl=new Element(["Thallium", "Tl", "1861 AD", 204.38, 81, (13,6)],[[1, 0,0,0,0,1,0], [0], [0, 0,0]]);
const Pb=new Element(["Lead", "Pb", "4000 BC", 207.2, 82, (14,6)],[[1, 0,0,0,0,1,0], [0], [0, 0,0]]);
const Bi=new Element(["Bismuth", "Bi", "1400 AD", 208.98, 83, (15,6)],[[1, 0,0,0,0,1,0], [0], [0, 0,0]]);
const Po=new Element(["Polonium", "Po", "1898 AD", (209), 84, (16,6)],[[1, 0,0,0,0,1,0], [0], [0, 0,0]]);
const At=new Element(["Astatine", "At", "1940 AD",  (210), 85, (17,6)],[[0, 0,0,0,0,0,0], [1], [0, 0,0]]);
const Rn=new Element(["Radon", "Rn", "1900 AD", (222), 86, (18,6)],[[0, 0,0,0,0,0,0], [0], [1, 0,1]]);
const Fr=new Element(["Francium", "Fr", "1939 AD", (223), 87, (1,7)],[[1, 0,0,0,1,0,0], [0], [0, 0,0]]);
const Ra=new Element(["Radium", "Ra", "1898 AD", (226), 88, (2,7)],[[1, 0,0,1,0,0,0], [0], [0, 0,0]]);
//break for 89=103
const Rf=new Element(["Rutherfordium", "Rf", "1964 AD", (267), 104, (4,7)],[[1, 0,0,0,0,0,1], [0], [0, 0,0]]);
const Db=new Element(["Dubnium", "Db", "1967 AD", (268), 105, (5,7)],[[1, 0,0,0,0,0,1], [0], [0, 0,0]]);
const Sg=new Element(["Seaborgium", "Sg", "1974 AD", (269), 106, (6,7)],[[1, 0,0,0,0,0,1], [0], [0, 0,0]]);
const Bh=new Element(["Bohrium", "Bh", "1981 AD", (270), 107, (7,7)],[[1, 0,0,0,0,0,1], [0], [0, 0,0]]);
const Hs=new Element(["Hassium", "Hs", "1984 AD", (277), 108, (8,7)],[[1, 0,0,0,0,0,1], [0], [0, 0,0]]);
const Mt=new Element(["Meitnerium", "Mt", "1982 AD", (278), 109, (9,7)],[[1, 0,0,0,0,0,1], [0], [0, 0,0]]);
const Ds=new Element(["Darmstadtium", "Ds", "1994 AD", (281), 111, (10,7)],[[1, 0,0,0,0,0,1], [0], [0, 0,0]]);
const Rg=new Element(["Roentgenium", "Rg", "1994 AD", (282), 112, (11,7)],[[1, 0,0,0,0,0,1], [0], [0, 0,0]]);
const Cn=new Element(["Copernicium", "Cn", "1996 AD", (285), 112, (12,7)],[[1, 0,0,0,0,0,1], [0], [0, 0,0]]);
const Nh=new Element(["Nihonium", "Nh", "2004 AD", (286), 113, (13,7)],[[1, 0,0,0,0,0,1], [0], [0, 0,0]]);
const Fl=new Element(["Flerovium", "Fl", "1998 AD", (289), 114, (14,7)])
const Mc=new Element(["Moscovium", "Mc", "2004 AD", (290), 115, (15,7)],[[1, 0,0,0,0,1,0], [0], [0, 0,0]]);
const Lv=new Element(["Livermorium", "Lv", "2000 AD", (293), 116, (16,7)],[[1, 0,0,0,0,1,0], [0], [0, 0,0]]);
const Ts=new Element(["Tennessine", "Ts", "2010 AD", (294), 117, (17,7)], undefined)
const Og=new Element(["Oganesson", "Og", "2006 AD", (294), 118, (18,7)],[[0, 0,0,0,0,0,0], [0], [1, 0,1]]);
//Do the two breaks.

const La=new Element(["Lanthanum", "La", "1839 AD", 138.91, 57, (4,8)],[[1, 1,0,0,0,0,0], [0], [0, 0,0]]);
const Ce=new Element(["Cerium", "Ce", "1803 AD", 140.12, 58, (5,8)],[[1, 1,0,0,0,0,0], [0], [0, 0,0]]);
const Pr=new Element(["Praseodymium", "Pr", "1885 AD", 140.91, 59, (6,8)],[[1, 1,0,0,0,0,0], [0], [0, 0,0]]);
const Nd=new Element(["Neodymium", "Nd", "1885 AD", 144.24, 60, (7,8)],[[1, 1,0,0,0,0,0], [0], [0, 0,0]]);
const Pm=new Element(["Promethium", "Pm", "1945 AD", (145), 61, (8,8)],[[1, 1,0,0,0,0,0], [0], [0, 0,0]]);
const Sm=new Element(["Samarium", "Sm", "1879 AD", 150.36, 62, (9,8)],[[1, 1,0,0,0,0,0], [0], [0, 0,0]]);
const Eu=new Element(["Europium", "Eu", "1901 AD", 151.96, 63, (10,8)],[[1, 1,0,0,0,0,0], [0], [0, 0,0]]);
const Gd=new Element(["Gadolinium", "Gd", "1880 AD", 157.25, 64, (11,8)],[[1, 1,0,0,0,0,0], [0], [0, 0,0]]);
const Tb=new Element(["Terbium", "Tb", "1843 AD", 158.93, 65, (12,8)],[[1, 1,0,0,0,0,0], [0], [0, 0,0]]);
const Dy=new Element(["Dysprosium", "Dy", "1886 AD", 162.50, 66, (13,8)],[[1, 1,0,0,0,0,0], [0], [0, 0,0]]);
const Ho=new Element(["Holmium", "Ho", "1878 AD", 164.93, 67, (14,8)],[[1, 1,0,0,0,0,0], [0], [0, 0,0]]);
const Er=new Element(["Erbium", "Er", "1842 AD", 167.26, 68, (15,8)],[[1, 1,0,0,0,0,0], [0], [0, 0,0]]);
const Tm=new Element(["Thulium", "Tm", "1879 AD", 168.93, 69, (16,8)],[[1, 1,0,0,0,0,0], [0], [0, 0,0]]);
const Yb=new Element(["Ytterbium", "Yb", "1878 AD", 173.05, 70, (17,8)],[[1, 1,0,0,0,0,0], [0], [0, 0,0]]);
const Lu=new Element(["Lutetium", "Lu", "1907 AD", 174.97, 71, (18,8)],[[1, 1,0,0,0,0,0], [0], [0, 0,0]]);

const Ac=new Element(["Actinium", "Ac", "1899 AD", (227), 89, (4,9)],[[1, 0,1,0,0,0,0], [0], [0, 0,0]]);
const Th=new Element(["Thorium", "Th", "1829 AD", 232.04, 90, (5,9)],[[1, 0,1,0,0,0,0], [0], [0, 0,0]]);
const Pa=new Element(["Protactinium", "Pa", "1913 AD", 231.04, 91, (6,9)],[[1, 0,1,0,0,0,0], [0], [0, 0,0]]);
const U=new Element(["Uranium", "U", "1789 AD", 238.03, 92, (7,9)],[[1, 0,1,0,0,0,0], [0], [0, 0,0]]);
const Np=new Element(["Neptunium", "Np", "1940 AD", (237), 93, (8,9)],[[1, 0,1,0,0,0,0], [0], [0, 0,0]]);
const Pu=new Element(["Plutonium", "Pu", "1940 AD", (244), 94, (9,9)],[[1, 0,1,0,0,0,0], [0], [0, 0,0]]);
const Am=new Element(["Americium", "Am", "1944 AD", (243), 95, (10,9)],[[1, 0,1,0,0,0,0], [0], [0, 0,0]]);
const Cm=new Element(["Curium", "Cm", "1944 AD", (247), 96, (11,9)],[[1, 0,1,0,0,0,0], [0], [0, 0,0]]);
const Bk=new Element(["Berkelium", "Bk", "1949 AD", (247), 97, (12,9)],[[1, 0,1,0,0,0,0], [0], [0, 0,0]]);
const Cf=new Element(["Californium", "Cf", "1950 AD", (251), 98, (13,9)],[[1, 0,1,0,0,0,0], [0], [0, 0,0]]);
const Es=new Element(["Einsteinium", "Es", "1952 AD", (252), 99, (14,9)],[[1, 0,1,0,0,0,0], [0], [0, 0,0]]);
const Fm=new Element(["Fermium", "Fm", "1952 AD", (257), 100, (15,9)],[[1, 0,1,0,0,0,0], [0], [0, 0,0]]);
const Md=new Element(["Mendelevium", "Md", "1955 AD", (258), 101, (16,9)],[[1, 0,1,0,0,0,0], [0], [0, 0,0]]);
const No=new Element(["Nobelium", "No", "1958 AD", (259), 102, (17,9)],[[1, 0,1,0,0,0,0], [0], [0, 0,0]]);
const Lr=new Element(["Lawrencium", "Lr", "1961 AD", (266), 103, (18,9)],[[1, 0,1,0,0,0,0], [0], [0, 0,0]]);

//I would like to add the isotopes [stable and such], but I need to learn more since the decay maps are complex.







//Bare minimums
//SigFig function [find sig figs, preserve only sig figs appropraite for addition, sub, multi, and division]
//finish groupings/series. DONE
//Q1. Filling electron shells effectively 
//Q2. Predictive electron shells for filling neturaol, positive, negative.
//!3. Isotopes, stable/unstable, massNum, Neutron count, halflife, abundance. 
//SigFig Operations



//[[0, 0,0,0,0,0,0], [0], [0, 0,0]]
//Is nonmetal://[[0, 0,0,0,0,0,0], [0], [1, 0,0]]
    //Noble Gasses, He, Ar, Rn, Og, Ne, Xe, Kr//[[0, 0,0,0,0,0,0], [0], [1, 0,1]]
    //Reactive NonMetal, F, N, O, P, Br, I, H, S, C, Cl//[[0, 0,0,0,0,0,0], [0], [1, 1,0]]
//Metalloid
    //Te, Si, At, Sb, As, Ge, B//,[[0, 0,0,0,0,0,0], [1], [0, 0,0]]
//Metals:
    //Lathanoids, La, Ce, Sm, Eu, Pm, Gd, Yb, Dy, Er,Pr, Tm, Tb, Ho, Lu, Nd //,[[1, 1,0,0,0,0,0], [0], [0, 0,0]]
    //actinides,  Ac, Am, Es, Lr, U, Fm, Np, Pa, Md,Th, Pu, No, Bk, Cm, Cf//,[[1, 0,1,0,0,0,0], [0], [0, 0,0]]
    //AlkalineEarth, Be, Ca, Sr, Ra, Ba, Mg//,[[1, 0,0,1,0,0,0], [0], [0, 0,0]]
    //AlkaliMetal, Na, K, Rb, Li, Cs, Fr,//,[[1, 0,0,0,1,0,0], [0], [0, 0,0]]
    //PostTransition, In [Indium], Pb, Al, Bi, Tl, Po, Ga, Sn//,[[1, 0,0,0,0,1,0], [0], [0, 0,0]]
    //Transition, Fe, Mn, Co, V, Cu, Ti, Cr, Ni, 
                //Zr, Pd, Ru, Rh, Hf, Pt, Sc, Hs, Cn, Ag, Tc, Re, Au, W, Y, Bh, Mt, Mo, Nb, Os, Ta, Ir, Cd, Hg, Rf, Ds, Db, Sg, Rg //,[[1, 0,0,0,0,0,1], [0], [0, 0,0]]
 //Ones that were not listed well : zn,se,nh, fl, mc, lv, ts, grouping
    //zn is transition
    //se is a metalloid
    //nh most stable is 10 seconds... very littlek nown. predicted to be a transition metal as well, but is unknown
    //fl, half life of 22 minutes. Classified as an alkali metal
    //mc predicited to be a post transition metal, half life of .65 seconds
    //lv predicited to be a post transition metal, half life of 60 milliseconds
    //ts tens-100s of milliseconds. predicted halogen. but completely unknown for now.
     
 