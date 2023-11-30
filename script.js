'use strict'

//button reference
const newGame = document.querySelector('.newGame');
const rollDice = document.querySelector('.rollDice');
const setName = document.querySelector('.setNamebtn');
const hold = document.querySelector('.hold');
const player1Btn = document.getElementById('player1Start');
const player2Btn = document.getElementById('player2Start');


const player1Score = document.getElementById('player1_score');
const player2Score = document.getElementById("player2_score");

const player1 = document.querySelector(".player1_cont");
const player2 = document.querySelector(".player2_cont");

const player1Name = document.querySelector(".player1Name");
const player2Name = document.querySelector(".player2Name");

const dice = document.querySelectorAll(".dice");
const winner = document.querySelector(".winner_cont");
const winner_name = document.getElementById("winner_name");

var currentPlayer;
// var currPlayerName;
let score = 0;
let totalscore = 0;
let totalscorePlayer1 = 0;
let totalscorePlayer2 = 0;
let previousRoll = 0;


const hideGameStart = function () {
  document.querySelector(".selectPlayer").classList.add("displayNone");
  document.querySelector(".overlayCont").classList.add("displayNone");
  document.querySelector(".gameStartCont").classList.add("displayNone");
}

const displayDice = function (diceRoll) {
  dice[diceRoll - 1].classList.remove("displayNone");
}

const hideDice = function (diceRoll) {
  dice[diceRoll - 1].classList.add('displayNone');
}

//change chance of the player
const changePlayer = function (totalscore) {
  if (!player1.classList.contains("inactive")) {
    player1Name.nextElementSibling.innerText = totalscorePlayer1;
    player1.classList.add("inactive");
    player2Chance();
  }
  else
  {
    player2Name.nextElementSibling.innerText = totalscorePlayer2;
    player2.classList.add("inactive");
    player1Chance();
  }
  score = 0;
};

//player1 chance
const player1Chance = function () {
  player1.classList.remove("inactive");
  
};

// player2 chance
const player2Chance = function () {
  player2.classList.remove("inactive");
};


function checkCurrentPlayer() {
  let p;
  player1.classList.contains("inactive") ? p = player2 : p = player1;
  return p;
}



//setting the names of the players
setName.addEventListener('click', () => {
    var player1 = document.getElementById("player1").value;
    var player2 = document.getElementById("player2").value;
    document.querySelector('.enterName').classList.add('displayNone');
    player1Btn.innerText = player1;
    player2Btn.innerText = player2;
  document.querySelector('.selectPlayer').classList.remove('displayNone');
  player1Name.innerHTML = player1;
  player2Name.innerHTML = player2;
});



//selecting player1 to start first
player1Btn.addEventListener('click', () => {
  hideGameStart();
  player1Chance();
});

//selecting player2 to start first
player2Btn.addEventListener("click", () => {
  hideGameStart();
  player2Chance();
  
});


//rolling dice 
rollDice.addEventListener("click", () => {

  //getting the active player
  
  currentPlayer = checkCurrentPlayer();

  if (previousRoll !== 0) hideDice(previousRoll);
  var diceRoll = Math.floor(Math.random() * (6 - 1) + 1);
  previousRoll = diceRoll;
  displayDice(diceRoll);

  
  if (diceRoll !== 1)
  {
    score += diceRoll;
    currentPlayer.getElementsByClassName("score")[0].innerText = score;
  }
  else
  {
    currentPlayer.getElementsByClassName("score")[0].innerText = "0";
    changePlayer();
    // score = 0 ? changePlayer(0) : changePlayer(score);
  }
});


//holding the score into totalscore
hold.addEventListener('click', () => {
  currentPlayer = checkCurrentPlayer();
  
  console.log(currentPlayer.id);
  
  
  let currTotalScore = Number(currentPlayer.getElementsByClassName("highScore")[0].innerText);
  
  
  if (score === 0) {
    alert("Please roll the dice first");
  }
  else if (score > 0) {
    if (currentPlayer === player1) {
      totalscorePlayer1 = currTotalScore + score;
      currTotalScore = totalscorePlayer1;
    } else {
      totalscorePlayer2 = currTotalScore + score;
      currTotalScore = totalscorePlayer2;
    };
    currentPlayer.getElementsByClassName("highScore")[0].innerText = currTotalScore;
    currentPlayer.getElementsByClassName("score")[0].innerText = "0";
    changePlayer();
    console.log(currTotalScore);
  }
  if (currTotalScore >= 100) {
    winner.classList.remove("displayNone");
      document.querySelector(".overlayCont").classList.remove("displayNone");

    winner_name.innerText = `Congarts, ${currentPlayer.getElementsByClassName("playerNameCont")[0].firstElementChild.innerText} win's the game.`;

  }
});


//new game to play
newGame.addEventListener('click', () => {
  location.reload();
  // hideDice(previousRoll);
  // score = 0;
  // totalscore = 0;
  // totalscorePlayer1 = 0;
  // totalscorePlayer2 = 0;
  // previousRoll = 0;
  // document.querySelector(".selectPlayer").classList.remove("displayNone");
  // document.querySelector(".overlayCont").classList.remove("displayNone");
  // document.querySelector(".gameStartCont").classList.remove("displayNone");
  // winner.classList.add("displayNone");

})








