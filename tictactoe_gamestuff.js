"use strict";

/*
Author: Lennox Stampp
Date: 12/30/2020
 */

// Variables
let player1Marker="X";                   //var for player1 input for marker val
let player2Marker="O";                  //var for player2 input for marker val
let playerInput_array=new Array();      //array to keep track of user's moves
let result;
let opponent;


//Functions

//Chane display of parent element to hidden
function hideParent(elem) {
    let parentElem = elem.parentElement;
    parentElem.style.display = "none";
}

//Select how many players
function playerSelect(button) {
    let choice = button.id.toString();
    console.log(choice);
    if (choice === "1playerMd") {
        opponent = 1;
    } else if (choice === "2playerMd") {
        opponent = 2;
    }
    hideParent(button);
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
    let marker2 = prompt("Enter 1 or 2 characters for the marker for Player 1:");
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
//Also append the playerInput_array with the .box id
function playerMark(elem_id) {
    let boxSelected=elem_id.id;             //var to hold the id value
    elem_id.innerHTML=player1Marker;         //place the mark on the .box
    let boxNum = parseInt(boxSelected[boxSelected.length - 1]); //get box id num as a num
    console.log(boxNum);
    //playerInput_array.push(boxSelected);
    playerInput_array.push(boxNum);         //append array with box id num
}

//Take turns


//computer logic


//Check if one of eight ways to win
function checkWin(array) {
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

    const nWin1=[1,2,3];
    const nWin2=[4,5,6];
    const nWin3=[7,8,9];
    const nWin4=[1,4,7];
    const nWin5=[2,5,8];
    const nWin6=[3,6,9];
    const nWin7=[1,5,9];
    const nWin8=[3,5,7];

    //const equals = (a, b) => JSON.stringify(a) === JSON.stringify(b);

    //
    let sPlayerInput_array=array.sort().toString();
    //let sPlayerInput_array=array.sort();
    //window.alert(sPlayerInput_array);

    /*
    //test***************currently works to compare arrays******************
    if (sPlayerInput_array.includes(nWin2)) {
        window.alert("win2!",console.log(sPlayerInput_array));
    }   else {
        window.alert("still not working",console.log(sPlayerInput_array,"error"));
    }
    */

    //win array
    //const winArray=[win1,win2,win3,win4,win5,win6,win7,win8];
    let winArray;
    winArray = [nWin1, nWin2, nWin3, nWin4, nWin5, nWin6, nWin7, nWin8];

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

