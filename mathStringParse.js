let mathStatement=undefined; //user input



let logicObj = {
    tokens:[["_"],
            ["..."],
            ["\\expr"]
           ],
    expr:[["_", "is", "_"]
          ["a"],
          ["for all"],
          ["there exists"],
          ["does not exist"],
          ["cannot be"],
          ["must"]
         ],
    ifPair:[
        ["if","else"],
        ["if","then"] 
    ],
    orPair:[["or"],
            ["either","or"]
            ["either",",","or"] //This kind of comma can be replaced with a series of 'or' statements
    ],
    andPair:[["and"]
            ]

};

let specialTokens=["\\expr"]; //Expr is any string. Parsed later basically, or of lower priority
let logic1Symbols=["if", "then", "otherwise", "else", ",", ".", "and", "or", "is", "cannot", "be", "exists", "there", "are", "for", "all", "every"];
let logicOwnership={
    //[[ItemFound], [ItemsBefore], [ItemsAfter]]
    lgcStatement:[ //find other symbols [not tokens] to define sub structures
        [["if"],[],[",","then"]],
        [["else"],["if",","],[]],
        [[","],[],[]], //not clear 
        [["."],[],[]], //not clear, but should denote end, 
        [["and"],[],[]],
        [["or"],[],[]],
        [["is"],[],[]],
        [["cannot"],[],[]],
        [["be"],[],[]],
        [["exists"],[],[]],
        [["there"],[],[]],
        [["are"],[],[]],
        [["for"],[],[]],
        [["all"],[],[]],
        [["every"],[],[]],
        [[],[],[]]

    ]
};


function markUpStatement(mState){

}

