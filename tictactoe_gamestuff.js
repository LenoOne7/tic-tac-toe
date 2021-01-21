"use strict";

/*
Author: Lennox Stampp
Date: 12/30/2020
 */

// Variables
let player1Marker="X";                   //var for player1 input for marker val
let player2Marker="O";                  //var for player2 input for marker val
let playerInput_obj={box1:"", box2:"", box3:"", box4:"", box5:"", box6:"",
                        box7:"", box8:"", box9:""};     //object to keep track of user's moves on game board
let result;
let opponent;
let turn = 0;                           //0 is player 1, 1 is player 2
let turnCount = 0;                      //track number of moves
let currentPlayer;                      //container


//Functions

//Chane display of parent element to hidden
function hideParent(elem) {
    let parentElem = elem.parentElement;
    parentElem.style.display = "none";

}

function unhideParent() {
    let parentElem = document.getElementById("unhide");
    parentElem.style.display = "grid";
}

//Select how many players
function playerSelect(button) {
    let choice = button.id.toString();
    console.log(choice);
    if (choice === "1playerMd") {
        opponent = 1;
        pickMarker1();
    } else if (choice === "2playerMd") {
        opponent = 2;
        pickMarker1();
        pickMarker2();
    }
    hideParent(button);
    unhideParent();
}

//Player marker select
//Loads after page is loaded
function pickMarker1() {
    let marker1 = prompt("Enter 1 or 2 characters for the marker for Player 1:");
    try {
        marker1 = marker1.substr(0,2);
    }   catch {
        marker1 = marker1.substr(0,1)
    }
    if (marker1.length < 1) {
        marker1="X"
    }
    player1Marker = marker1;
}
function pickMarker2() {
    let marker2 = prompt("Enter 1 or 2 characters for the marker for Player 2:");
    try {
        marker2 = marker2.substr(0,2);
    }   catch {
        marker2 = marker2.substr(0,1)
    }
    if (marker2.length < 1) {
        marker2 = "O"
    }
    player2Marker = marker2;
}

//Get the element's id value and place the player's mark on the .box
//Also append the playerInput_obj with the .box id
function playerMark(elem_id) {
    let boxSelected = elem_id.id;             //var to hold the id value
    let boxNum = parseInt(boxSelected[boxSelected.length - 1]); //get box id num as a num [get num only]
    console.log(boxNum);
    let sBoxSelected = boxSelected.toString();
    takeTurn();
    playerInput_obj[sBoxSelected] = currentPlayer;         //append array with box id num
    elem_id.innerHTML = currentPlayer;         //place the mark on the .box

}

//Take turns
function takeTurn() {
    if (turn == 0) {
        currentPlayer = player1Marker;
        turn += 1;
    }   else if (turn == 1) {
        currentPlayer = player2Marker;
        turn -= 1;
    }
    turnCount += 1;
}

//computer logic


//Check if one of eight ways to win
function checkWin(object) {
    //win conditions
    /*const win1=["box1","box2","box3"];
    const win2=["box4","box5","box6"];
    const win3=["box7","box8","box9"];
    const win4=["box1","box4","box7"];
    const win5=["box2","box5","box8"];
    const win6=["box3","box6","box9"];
    const win7=["box1","box5","box9"];
    const win8=["box3","box5","box7"];

     */

    /*
    const nWin1=[1,2,3];
    const nWin2=[4,5,6];
    const nWin3=[7,8,9];
    const nWin4=[1,4,7];
    const nWin5=[2,5,8];
    const nWin6=[3,6,9];
    const nWin7=[1,5,9];
    const nWin8=[3,5,7];
    */

    //RegEx search patterns for win conditions
    const regXWin1=/1.*\s*\w*2.*\s*\w*3/;
    const regXWin2=/4,*\s*\w*5.*\s*\w*6/;
    const regXWin3=/7.*\s*\w*8.*\s*\w*9/;
    const regXWin4=/1.*\s*\w*4.*\s*\w*7/;
    const regXWin5=/2.*\s*\w*5.*\s*\w*8/;
    const regXWin6=/3.*\s*\w*6.*\s*\w*9/;
    const regXWin7=/1.*\s*\w*5.*\s*\w*9/;
    const regXWin8=/3.*\s*\w*5.*\s*\w*7/;

    //const equals = (a, b) => JSON.stringify(a) === JSON.stringify(b);

    //
    //let sPlayerInput_array = array.sort().toString();
    //let sPlayerInput_array=array.sort();
    //window.alert(sPlayerInput_array);

    /*
    let regXnums = /1+,5+,9+/;      //regEx to search for specific numbers

    let testSearch = regXnums.test(nWin7.toString())
    if (testSearch) {
        window.alert("regX win7!",console.log(sPlayerInput_array,nWin7.toString()));
    }   else {
        window.alert("still not working",console.log(sPlayerInput_array,"error"));
    }
    /*
    //test***************currently works to compare arrays******************
    if (sPlayerInput_array.includes(nWin2)) {
        window.alert("regX win2!",console.log(sPlayerInput_array));
    }   else {
        window.alert("still not working",console.log(sPlayerInput_array,"error"));
    }

     */

    //put boxid selected by player into an array for each player
    let aPlayer1 = [];
    let aPlayer2 = [];

    //fill Player arrays
    for (let box in object) {
        if (object[box] < 1) { continue; }      //if no val in box, skip
        else if (object[box] === player1Marker) {
            aPlayer1.push(box);
        }   else if (object[box] === player2Marker) {
            aPlayer2.push(box);
        }
    }
    console.log(aPlayer1.toString());
    console.log(aPlayer2);
    //search player arrays to see if either has a win condition
    /* let winArray;
    winArray = [nWin1, nWin2, nWin3, nWin4, nWin5, nWin6, nWin7, nWin8];
    */
    let regxArray;
    regxArray = [regXWin1,regXWin2,regXWin3,regXWin4,regXWin5,regXWin6,regXWin7,regXWin8];


    for (let pattern in regxArray) {
        console.log(regxArray[pattern]);
        let winSearch1 = regxArray[pattern].test(aPlayer1.sort().toString());
        if (winSearch1) {
            window.alert("winner is Player1!!!");
            result = 1;
        } else {
            console.log("no match");
        }

        let winSearch2 = regxArray[pattern].test(aPlayer2.sort().toString());
        if (winSearch2) {
            window.alert("winner is Player2!!!");
            result = 2;
        } else {
            console.log("no match");
            continue;
        }
    }


    /*
    //burp
    for (let winCon in winArray) {
        for ( regEx in regxArray) {
            let isMatch = regEx.test(winCon.toString());
            if (isMatch) {
                console.log("winner is:",)
            }
        }
    }


    //win array
    //const winArray=[win1,win2,win3,win4,win5,win6,win7,win8];
    //let winArray;
    //winArray = [nWin1, nWin2, nWin3, nWin4, nWin5, nWin6, nWin7, nWin8];

    //check if array has a win condition
    let win;
    for (win in winArray) {     //check each win condition
        //window.alert(win);
        console.log(win);
        if (sPlayerInput_array.includes(winArray[win])) {  //if win condition matches array
            window.alert("winner!");
            console.log(win,"win var");
            console.log(winArray[win],"winArray[] value");
            result = 1;         //winner!
        }   else {
                console.log("No win")
                result = 0;       //not winner :-(
        }
    }
     */
}

//check for winner and declare winner
function winCond(array) {
    let check=0;
    while(check != 1) {
        onclick="check=checkWin(array)";
        if (check == 1) {
            window.alert("You win!");
        }
    }
}


// Main Game

