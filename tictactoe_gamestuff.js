"use strict";

/*
Author: Lennox Stampp
Date: 12/30/2020
 */

// Variables
let player1Marker="X";                   //var for player1 input for marker val
let player2Marker="O";                  //var for player2 input for marker val
let playerInput_obj = {box1:"", box2:"", box3:"", box4:"", box5:"", box6:"",
                        box7:"", box8:"", box9:""};     //object to keep track of user's moves on game board
let result = 0;
let opponent;
let turn = 0;                           //0 is player 1, 1 is player 2
let turnCount = 0;                      //track number of moves
let currentPlayer;                      //container
let p1WinLossDraw = [0,0,0];                 //win,loss,draw data player1
let p2WinLossDraw = [0,0,0];                 //win,loss,draw data player2
let gameCount = [0,0];                      //games played, draw games


//Functions

//Change display of parent element to hidden
function hideParent(elem) {
    let parentElem = elem.parentElement;
    parentElem.style.display = "none";

}
//Reveal game board
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

    //Highlight player who's turn it is currently
    if (turn == 0) {
        let parentElem = document.getElementById("player1_score");
        parentElem.style.border = "solid green";
        parentElem.style.boxShadow = "0px 10px 6px green";
        let parentElem2 = document.getElementById("player2_score");
        parentElem2.style.border = "solid red";
        parentElem2.style.boxShadow = "none";
    }   else if (turn == 1) {
        let parentElem2 = document.getElementById("player2_score");
        parentElem2.style.border = "solid green";
        parentElem2.style.boxShadow = "0px 10px 6px green";
        let parentElem = document.getElementById("player1_score");
        parentElem.style.border = "solid red";
        parentElem.style.boxShadow = "none";
    }

    turnCount += 1;
    console.log(turnCount,"turn count");
    console.log(result, "result");
}


//reset game board
function resetGame(plyr1array, plyr2array,plyrInput_obj) {
    const gameBoard = ["box1", "box2","box3", "box4","box5", "box6","box7", "box8", "box9"];
    for (let box in gameBoard) {
        let gameBox = document.getElementById(gameBoard[box]);
        gameBox.innerHTML = "";
    }
    plyr1array.splice(0, plyr1array.length);;
    plyr2array.splice(0, plyr2array.length);
    for (let val in plyrInput_obj) {
        delete plyrInput_obj[val];
    }
    result = 0;
    turnCount = 0;
}

//computer logic


//Check if one of eight ways to win
function checkWin(object) {
    //win conditions

    //RegEx search patterns for win conditions
    const regXWin1=/1.*\s*\w*2.*\s*\w*3/;
    const regXWin2=/4,*\s*\w*5.*\s*\w*6/;
    const regXWin3=/7.*\s*\w*8.*\s*\w*9/;
    const regXWin4=/1.*\s*\w*4.*\s*\w*7/;
    const regXWin5=/2.*\s*\w*5.*\s*\w*8/;
    const regXWin6=/3.*\s*\w*6.*\s*\w*9/;
    const regXWin7=/1.*\s*\w*5.*\s*\w*9/;
    const regXWin8=/3.*\s*\w*5.*\s*\w*7/;


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

    let regxArray;
    regxArray = [regXWin1,regXWin2,regXWin3,regXWin4,regXWin5,regXWin6,regXWin7,regXWin8];


    for (let pattern in regxArray) {
        console.log(regxArray[pattern]);
        let winSearch1 = regxArray[pattern].test(aPlayer1.sort().toString());
        if (winSearch1) {
            window.alert("winner is Player1!!!");
            result = 1;
            resetGame(aPlayer1,aPlayer2,playerInput_obj);
            gameCount[0] += 1;
            p1WinLossDraw[0] += 1;
            p2WinLossDraw[1] += 1;
        } else {
            console.log("no match");
        }

        let winSearch2 = regxArray[pattern].test(aPlayer2.sort().toString());
        if (winSearch2) {
            window.alert("winner is Player2!!!");
            result = 2;
            resetGame(aPlayer1,aPlayer2,playerInput_obj);
            gameCount[0] += 1;
            p2WinLossDraw[0] += 1;
            p1WinLossDraw[1] += 1;
        } else {
            console.log("no match");
            continue;
        }
    }

    if (turnCount == 9 && result == 0) {
        window.alert("TIE GAME");
        resetGame(aPlayer1,aPlayer2,playerInput_obj);
        gameCount[0] += 1;
        gameCount[1] += 1;
        p1WinLossDraw[2] += 1;
        p2WinLossDraw[2] += 1;
    }

    showGameStats();

}

// Game data
function showGameStats() {
    //Player 1 stats
    let sP1Win = p1WinLossDraw[0].toString();
    let p1win = document.getElementById("ply1win_data");
    p1win.innerHTML = sP1Win;
    let sP1Loss = p1WinLossDraw[1].toString();
    let p1loss = document.getElementById("ply1loss_data");
    p1loss.innerHTML = sP1Loss;
    let sP1Draw = p1WinLossDraw[2].toString();
    let p1Draw = document.getElementById("ply1draw_data");
    p1Draw.innerHTML = sP1Draw;

    //Player2 stats
    let sP2Win = p2WinLossDraw[0].toString();
    let p2win = document.getElementById("ply2win_data");
    p2win.innerHTML = sP2Win;
    let sP2Loss = p2WinLossDraw[1].toString();
    let p2loss = document.getElementById("ply2loss_data");
    p2loss.innerHTML = sP2Loss;
    let sP2Draw = p2WinLossDraw[2].toString();
    let p2Draw = document.getElementById("ply2draw_data");
    p2Draw.innerHTML = sP2Draw;

    //General game stats
    let sGamePlayed = gameCount[0].toString();
    let gp = document.getElementById("gamesPlayed_data");
    gp.innerHTML = sGamePlayed;
    let sGamesDraw = gameCount[1].toString();
    let gd = document.getElementById("drawGames_data");
    gd.innerHTML = sGamesDraw;

}


