function makeElement(){
    class Element {
        constructor(constantList, 
                    seriesInfoList=undefined, 
                    initialTempatureAndStateList=undefined, 
                    energyLevelList=undefined, electroNegativity=undefined,
                    stateChangeList=undefined,
                    electronAffinityAndIonizationListList=undefined,
                    radiusList=undefined,
                    hardnessList=undefined,
                    modulusList=undefined,
                    densityList=undefined,
                    conductivityList=undefined,
                    heatList=undefined,
                    abundanceList=undefined){ //put in arguments
            //this._temp=temp
            expectedLengthConstantList=7
            if (constantList!=undefined && length(constantList)==expectedLengthConstantList){
                this._ELEMENT_NAME=constantList[0],
                this._ELEMENT_SYMBOL=constantList[1],
                this._DISCOVERED=constantList[2],
                this._WEIGHT=constantList[3],  
                this._ATOMIC_NUMBER=constantList[4], //# Protons==Electrons [in neutral charge]. Neutrons are subject to chagne
                this._PERODIC_ROW=constantList[5],
                this._PERODIC_COLUMN=constantList[6]
            } else{
                if (constantList==undefined) {
                    throw Error("Expected at least an elements immutable values")
                } else{
                    throw Error(`Expected at least ${expectedLengthConstantList} values in constantList`)
                }
            }

            //#region 
            /* Example of what I desire later. Used https://ptable.com/?lang=en#Properties/Discovered
                const H=Element(["Hydrogen","H", "1766AD", 1.008, 1, (1,1)], //(col, row)
                [[false, false, false, false, false, false, false],[false],[true, true, false]], //Series, if [0] is false, then no need to check the rest (I think)
                [0, "solid"],//start temp, state
                [1], 2.20, //energy levels, electronegativity
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
            //#endregion

            this._is_stable,
            this._STABLE_ISOTOPES=[] //push an object of neutron:abundance values.
            this._UNSTABLE_ISOTOPES=[]

            //#region Series
            this._IS_Metal=undefined,
                    this._IS_Lathanoid=undefined,
                    this._IS_Actinoid=undefined,
                    this._IS_alkalineEarthMetal=undefined,
                    this._IS_AlkaliMetal=undefined,
                    this._IS_PostTransitionMetal=undefined,
                    this._IS_TransitionMetal=undefined,
            
                this._IS_Metalloid=undefined,

                this._IS_Nonmetal=undefined,
                    this._IS_ReactiveNonMetal=undefined,
                    this._IS_NobleGas=undefined

            try {
                this.series=seriesInfoList
            }
            catch (error) {
                print(error) 
            }
            //#endregion
            
            //#region Tempature and State
            //K, default -273 C === -459 F === 0K 
            this._temp=undefined, //C,K,F
            this._state=undefined //"solid" || "liquid" || "gas" || "plasma", 
            try {
                this.tempAndState=initialTempatureAndStateList
            }
            catch (error){
                print(error)
            }
            //#endregion

            //#region EnergyLevels and ElectroNegativity
            //Unit?
            this._energyLevels, //An array on the side of the element usually
            this._electronegativity, 
            //#endregion

            //#region PhaseTransitionTempatures
            //K default
            this._meltingPoint,
            this._boilingPoint
            try {
                this.stateChange=stateChangeList
            }
            catch (error){
                print(error)
            }
            //#endregion

            //insert check for initial state, tempature, if melting/boiling agree, if not throw. the sanity check should check if anything is undefined and if so just skip.

            //#region  electron affinity, ionization
            //Kl/Mol
            this._electronAffinity,
            this._ionization =[30],
            //#endregion

            //#region radius
            //pm
            this._radiusCalculated,
            this._radiusCEmpircal,
            this._radiusCovalent,
            this._radiusVanDerWaals,
            //#endregion 

            //#region Hardness
            //MPa
            this._hardnessBrinell,
            this._hardnessMohs,
            this._hardnessVickers,
            //#endregion

            //#region modulus
            //GPa
            this._modulusBulk,
            this._modulusSheer,
            this._modulusYoung,
            //#endregion

            //#region density
            //Kg/m^3
            this._densitySTP, 
            this._densityLiquid,
            //#endregion

            //#region conductivity
            //W/mK
            this._conductivityThermal,
            //MS/m
            this._conductivityElectical,
            //#endregion

            //#region heat
            //J/kgK
            this._heatSpecific,
            //Kj/mol
            this._heatVaporization,
            this._heatFusion,
            //#endregion

            //#region abundance
            //%
            this._abundanceUniverse,
            this._abundanceSolar,
            this._abundanceMeteor,
            this._abundanceCrust,
            this._abundanceOcean,
            this._abundanceHuman
            //#endregion

        }

        get _(){
            return NaN
        }
        set _(value){ //updateVal in the ()
            //this._=updateValue
        }
        set series(seriesList){
            expectedLengthSeriesInfoList=3
            expectedLengthSeriesInfoListMetals=7
            expectedLengthSeriesInfoListMetalloids=1
            expectedLengthSeriesInfoListNonmetals=3
            if (seriesInfoList!=undefined && length(seriesInfoList)==expectedLengthSeriesInfoList
            && length(seriesInfoList[0])==expectedLengthSeriesInfoListMetals 
            && length(seriesInfoList[1])==expectedLengthSeriesInfoListMetalloids 
            && length(expectedLengthSeriesInfoList[2])==expectedLengthSeriesInfoListNonmetals) {
                //categories -boolean
                this._IS_Metal=seriesList[0][0],
                    this._IS_Lathanoid=seriesList[0][1],
                    this._IS_Actinoid=seriesList[0][2],
                    this._IS_alkalineEarthMetal=seriesList[0][3],
                    this._IS_AlkaliMetal=seriesList[0][4],
                    this._IS_PostTransitionMetal=seriesList[0][5],
                    this._IS_TransitionMetal=seriesList[0][6],
            
                this._IS_Metalloid=seriesList[1][0],

                this._IS_Nonmetal=seriesList[2][0],
                    this._IS_ReactiveNonMetal=seriesList[2][1],
                    this._IS_NobleGas=seriesList[2][2]

            } else {
                if (length(seriesInfoList)!=expectedLengthSeriesInfoList) {
                    throw Error(`Expected at least ${expectedLengthSeriesInfoList} subLists in seriesInfoList`)
                }
                else if (length(seriesInfoList[0])!=expectedLengthSeriesInfoListMetals ){
                    throw Error(`Expected at least ${expectedLengthSeriesInfoListMetals} values in Metals series,
                     [is_metal, is_lathanoid, is_actinoid, is_alkalineEarthMetal, is_alkaliMetal, is_post-transitionalMetal,
                    is_transitionMetal]`)
                }
                else if (length(seriesInfoList[1])!=expectedLengthSeriesInfoListMetalloids ){
                    throw Error(`Expected at least ${expectedLengthSeriesInfoListMetalloids} values in Metals series, [is_metalloid]`)
                }
                else if (length(seriesInfoList[2])!=expectedLengthSeriesInfoListNonmetals ){
                    throw Error(`Expected at least ${expectedLengthSeriesInfoListNonmetals} values in Metals series,
                     [is_nonmetal, is_reactiveNonmetal, is_nobleGas]`)
                } 
            }
            
        }
        set tempature(kelvin){ //insert a above 0 check
            this._temp=kelvin
        }
        set state(matterState){ //insert a type string check, and is plasma, solid, gas, liquid check
            this._state=matterState
        }
        set tempAndState(initialTempatureAndStateList){ //insert length, and etc check
            this.temp=initialTempatureAndStateList[0]
            this.state=initialTempatureAndStateList[1]
        }
        set stateChange(stateChangeList){ //insert check boil<=vapour, length==2, type is number 
            this.boilingPoint=stateChangeList[0]
            this.meltingPoint=stateChangeList[1]
            //perhaps a sanity check whenever we adjust tempatures and such? To ensure state and tempature make sense whenever either is changed.
        }
        set boilingPoint(kelvin){
            this._boilingPoint=kelvin
        }
        set meltingPoint(kelvin){
            this._meltingPoint=kelvin
        }
    }
    return Element
}

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

const Element=makeElement()
/* Example of what I desire later. Used https://ptable.com/?lang=en#Properties/Discovered
const H=Element(["Hydrogen","H", "1766AD", 1.008, 1, (1,1)], //(col, row)
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
const H=Element(["Hydrogen","H", "1766AD", 1.008, 1, (1,1)])
const He=Element(["Helium", "He", "1895 AD", 4.0026, 2, (18,1)])
const Li=Element(["Lithium", "Li", "1817 AD", 6.94, 3, (1,2)])
const Be=Element(["Beryllium", "Be", "1797 AD", 9.0122, 4, (2,2)])
const B=Element(["Boron", "B", "1808 AD", 10.81, 5, (13,2)])
const C=Element(["Carbon", "C", "3759 BC", 12.011, 6, (14,2)])
const N=Element(["Nitrogen", "N", "1772 AD", 14.007, 7, (15,2)])
const O=Element(["Oxygen", "O", "1774 AD", 15.999, 8, (16,2)])
const F=Element(["Flourine", "F", "1886 AD", 18.998, 9, (17,2)])
const Ne=Element(["Neon", "Ne", "1898 AD", 20.180, 10, (18,2)])
const Na=Element(["Sodium", "Na", "1897 AD", 22.990, 11, (1,3)])

const Mg=Element(["Magnesium", "Mg", "1755 AD", 24.305, 12, (2,3)])
const Al=Element(["Aluminium", "Al", "1825 AD", 26.982, 13, (13,3)])
const Si=Element(["Silicon", "Si", "1824 AD", 28.085, 14, (14,3)])
const P=Element(["Phosphorus", "P", "1669 AD", 30.974, 15, (15,3)])
const S=Element(["Sulfer", "S", "500 BC", 32.06, 16, (16,3)])
const Cl=Element(["Chlorine", "Cl", "1774 AD", 35.45, 17, (17,3)])
const Ar=Element(["Argon", "Ar", "1894 AD", 39.948, 18, (18,3)])
const K=Element(["Potassium", "K", "1807 AD", 39.098, 19, (1,4)]) //Check the atomic weight of this here..

const Ca=Element(["Calcium", "Ca", "1808 AD", 40.078, 20, (2,4)])
const Sc=Element(["Scandium", "Sc", "1879 AD", 44.956, 21, (3,4)])
const Ti=Element(["Titanium", "Ti", "1791 AD", 47.867, 22, (4,4)])
const V=Element(["Vanadium", "V", "1801 AD", 50.942, 23, (5,4)])
const Cr=Element(["Chromium", "Cr", "1797 AD", 51.996, 24, (6,4)])
const Mn=Element(["Manganese", "Mn", "1774 AD", 54.938, 25, (7,4)])
const Fe=Element(["Iron", "Fe", "2000 BC", 55.845, 26, (8,4)])
const Co=Element(["Cobalt", "Co", "1735 AD", 58.933, 27, (9,4)])
const Ni=Element(["Nickel", "Ni", "1751 AD", 58.693, 28, (10,4)])
const Cu=Element(["Copper", "Cu", "8000 BC", 63.546, 29, (11,4)])
const Zn=Element(["Zinc", "Zn", "1500 AD", 65.38, 30, (12,4)])
const Ga=Element(["Gallium", "Ga", "1875 AD", 69.723, 31, (13,4)])
const Ge=Element(["Germanium", "Ge", "1886 AD", 39.098, 32, (14,4)])
const As=Element(["Arsenic", "As", "1250 AD", 39.098, 33, (15,4)])
const Se=Element(["Selenium", "Se", "1817 AD", 39.098, 34, (16,4)])
const Br=Element(["Bromine", "Br", "1826 AD", 39.098, 35, (17,4)])
const Kr=Element(["Krypton", "Kr", "1898 AD", 39.098, 36, (18,4)])
const Rb=Element(["Rubidium", "Rb", "1861 AD", 39.098, 37, (1,5)])

const Sr=Element(["Strontium", "Sr", "1790 AD", 87.62, 38, (2,5)])
const Y=Element(["Yttrium", "Y", "1794 AD", 88.906, 39, (3,5)])
const Zr=Element(["Zirconium", "Zr", "1789 AD", 91.224, 40, (4,5)])
const Nb=Element(["Niobium", "Nb", "1801 AD", 92.906, 41, (5,5)])
const Mo=Element(["Molybdenum", "Mo", "1781 AD", 95.95, 42, (6,5)])
const Tc=Element(["Technetium", "Tc", "1937 AD", (98), 43, (7,5)]) //What does the (98) mean, differ from 98?
const Ru=Element(["Ruthenium", "Ru", "1844 AD", 101.07, 44, (8,5)])
const Rh=Element(["Rhodium", "Rh", "1803 AD", 102.91, 45, (9,5)])
const Pd=Element(["Palladium", "Pd", "1803 AD", 106.42, 46, (10,5)])
const Ag=Element(["Silver", "Ag", "3000 BC", 107.87, 47, (11,5)])
const Cd=Element(["Cadmium", "Cd", "1817 AD", 112.41, 48, (12,5)])
const In=Element(["Indium", "In", "1863 AD",114.82, 49, (13,5)])
const Sn=Element(["Tin", "Sn", "3000 BC",118.71, 50, (14,5)])
const Sb=Element(["Antimony", "Sb", "3000 BC", 121.76, 51, (15,5)])
const Te=Element(["Tellurium", "Te", "1783 AD", 127.60, 52, (16,5)])
const I=Element(["Iodine", "I", "1811 AD", 126.90, 53, (17,5)])
const Xe=Element(["Xenon", "Xe", "1898 AD", 131.29, 54, (18,5)])
const Cs=Element(["Caesium", "Cs", "1860 AD", 132.91, 55, (1,6)])

const Ba=Element(["Barium", "Ba", "1808 AD", 137.33, 56, (2,6)])
//break for 57-71
const Hf=Element(["Hafnium", "Hf", "1923 AD", 178.49, 72, (4,6)])
const Ta=Element(["Tantalum", "Ta", "1802 AD", 180.95, 73, (5,6)])
const W=Element(["Tungsten", "W", "1783 AD", 183.84, 74, (6,6)])
const Re=Element(["Rhenium", "Re", "1925 AD", 186.21, 75, (7,6)])
const Os=Element(["Osmium", "Os", "1803 AD", 190.23, 76, (8,6)])
const Ir=Element(["Iridium", "Ir", "1803 AD", 192.22, 77, (9,6)])
const Pt=Element(["Platinum", "Pt", "1735 AD", 195.08, 78, (10,6)])
const Au=Element(["Gold", "Au", "2500 BC", 196.97, 79, (11,6)])
const Hg=Element(["Mercury", "Hg", "1500 BC", 200.59, 80, (12,6)])
const Tl=Element(["Thallium", "Tl", "1861 AD", 204.38, 81, (13,6)])
const Pb=Element(["Lead", "Pb", "4000 BC", 207.2, 82, (14,6)])
const Bi=Element(["Bismuth", "Bi", "1400 AD", 208.98, 83, (15,6)])
const Po=Element(["Polonium", "Po", "1898 AD", (209), 84, (16,6)])
const At=Element(["Astatine", "At", "1940 AD",  (210), 85, (17,6)])
const Rn=Element(["Radon", "Rn", "1900 AD", (222), 86, (18,6)])
const Fr=Element(["Francium", "Fr", "1939 AD", (223), 87, (1,7)])
const Ra=Element(["Radium", "Ra", "1898 AD", (226), 88, (2,7)])
//break for 89=103
const Rf=Element(["Rutherfordium", "Rf", "1964 AD", (267), 104, (4,7)])
const Db=Element(["Dubnium", "Db", "1967 AD", (268), 105, (5,7)])
const Sg=Element(["Seaborgium", "Sg", "1974 AD", (269), 106, (6,7)])
const Bh=Element(["Bohrium", "Bh", "1981 AD", (270), 107, (7,7)])
const Hs=Element(["Hassium", "Hs", "1984 AD", (277), 108, (8,7)])
const Mt=Element(["Meitnerium", "Mt", "1982 AD", (278), 109, (9,7)])
const Ds=Element(["Darmstadtium", "Ds", "1994 AD", (281), 111, (10,7)])
const Rg=Element(["Roentgenium", "Rg", "1994 AD", (282), 112, (11,7)])
const Cn=Element(["Copernicium", "Cn", "1996 AD", (285), 112, (12,7)])
const Nh=Element(["Nihonium", "Nh", "2004 AD", (286), 113, (13,7)])
const Fl=Element(["Flerovium", "Fl", "1998 AD", (289), 114, (14,7)])
const Mc=Element(["Moscovium", "Mc", "2004 AD", (290), 115, (15,7)])
const Lv=Element(["Livermorium", "Lv", "2000 AD", (293), 116, (16,7)])
const Ts=Element(["Tennessine", "Ts", "2010 AD", (294), 117, (17,7)])
const Og=Element(["Oganesson", "Og", "2006 AD", (294), 118, (18,7)])
//Do the two breaks.

const La=Element(["Lanthanum", "La", "1839 AD", 138.91, 57, (4,8)])
const Ce=Element(["Cerium", "Ce", "1803 AD", 140.12, 58, (5,8)])
const Pr=Element(["Praseodymium", "Pr", "1885 AD", 140.91, 59, (6,8)])
const Nd=Element(["Neodymium", "Nd", "1885 AD", 144.24, 60, (7,8)])
const Pm=Element(["Promethium", "Pm", "1945 AD", (145), 61, (8,8)])
const Sm=Element(["Samarium", "Sm", "1879 AD", 150.36, 62, (9,8)])
const Eu=Element(["Europium", "Eu", "1901 AD", 151.96, 63, (10,8)])
const Gd=Element(["Gadolinium", "Gd", "1880 AD", 157.25, 64, (11,8)])
const Tb=Element(["Terbium", "Tb", "1843 AD", 158.93, 65, (12,8)])
const Dy=Element(["Dysprosium", "Dy", "1886 AD", 162.50, 66, (13,8)])
const Ho=Element(["Holmium", "Ho", "1878 AD", 164.93, 67, (14,8)])
const Er=Element(["Erbium", "Er", "1842 AD", 167.26, 68, (15,8)])
const Tm=Element(["Thulium", "Tm", "1879 AD", 168.93, 69, (16,8)])
const Yb=Element(["Ytterbium", "Yb", "1878 AD", 173.05, 70, (17,8)])
const Lu=Element(["Lutetium", "Lu", "1907 AD", 174.97, 71, (18,8)])

const Ac=Element(["Actinium", "Ac", "1899 AD", (227), 89, (4,9)])
const Th=Element(["Thorium", "Th", "1829 AD", 232.04, 90, (5,9)])
const Pa=Element(["Protactinium", "Pa", "1913 AD", 231.04, 91, (6,9)])
const U=Element(["Uranium", "U", "1789 AD", 238.03, 92, (7,9)])
const Np=Element(["Neptunium", "Np", "1940 AD", (237), 93, (8,9)])
const Pu=Element(["Plutonium", "Pu", "1940 AD", (244), 94, (9,9)])
const Am=Element(["Americium", "Am", "1944 AD", (243), 95, (10,9)])
const Cm=Element(["Curium", "Cm", "1944 AD", (247), 96, (11,9)])
const Bk=Element(["Berkelium", "Bk", "1949 AD", (247), 97, (12,9)])
const Cf=Element(["Californium", "Cf", "1950 AD", (251), 98, (13,9)])
const Es=Element(["Einsteinium", "Es", "1952 AD", (252), 99, (14,9)])
const Fm=Element(["Fermium", "Fm", "1952 AD", (257), 100, (15,9)])
const Md=Element(["Mendelevium", "Md", "1955 AD", (258), 101, (16,9)])
const No=Element(["Nobelium", "No", "1958 AD", (259), 102, (17,9)])
const Lr=Element(["Lawrencium", "Lr", "1961 AD", (266), 103, (18,9)])
