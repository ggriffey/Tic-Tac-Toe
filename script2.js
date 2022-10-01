const s1 = document.querySelector(".s1");
const s2 = document.querySelector(".s2");
const s3 = document.querySelector(".s3");
const s4 = document.querySelector(".s4");
const s5 = document.querySelector(".s5");
const s6 = document.querySelector(".s6");
const s7 = document.querySelector(".s7");
const s8 = document.querySelector(".s8");
const s9 = document.querySelector(".s9");

const squares = [s1, s2, s3, s4, s5, s6, s7, s8, s9];
const oTurn = "O";
const xTurn = "X";

let turnCount = 1;
let winBool = false;
let winner = "";

let xCurrentSquares = [];
let oCurrentSquares = [];
let winConditions = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];

// SHOW WIN SCREEN
const winScreen = () => {
  document.querySelector("body").classList.remove("green");
  document.querySelector("body").classList.add("blue");
  document.querySelector("h1").style.fontSize = "5rem";
  document.querySelector("h1").textContent = `${winner} WINS Tic Tac Toe!`;
  document.querySelector(".message").textContent = "CONGRATULATIONS!";
};

// Helper function for checkWin
const arrayContainsArray = function (superset, subset) {
  if (0 === subset.length) {
    return false;
  }
  return subset.every(function (value) {
    return superset.indexOf(value) >= 0;
  });
};

// Check for winner after each turn
const checkWin = () => {
  xCurrentSquares.sort();
  oCurrentSquares.sort();
  if (turnCount % 2 === 0) {
    for (var i = 0; i < winConditions.length; i++) {
      console.log(arrayContainsArray(oCurrentSquares, winConditions[i]));
      winBool = arrayContainsArray(oCurrentSquares, winConditions[i]);
      if (winBool == true) {
        winner = "Player O";
        break;
      }
    }
  } else {
    for (var i = 0; i < winConditions.length; i++) {
      console.log(arrayContainsArray(xCurrentSquares, winConditions[i]));
      winBool = arrayContainsArray(xCurrentSquares, winConditions[i]);
      if (winBool == true) {
        winner = "Player X";
        break;
      }
    }
  }
  winBool ? winScreen() : console.log("not yet...");
};

// update player O
const oActions = (num) => {
  oCurrentSquares.push(num);
  turnCount++;
  document.querySelector(".message").textContent = "Player X turn";
};

// update player X
const xActions = (num) => {
  xCurrentSquares.push(num);
  turnCount++;
  document.querySelector(".message").textContent = "Player O turn";
};

// Carry out actions each turn
for (let i = 0; i < squares.length; i++) {
  squares[i].addEventListener("click", function () {
    console.log(`You clicked ${squares[i]}`);
    if (squares[i].textContent !== "X" && squares[i].textContent !== "O") {
      if (turnCount % 2 === 0 && winner == "") {
        xActions(Number([i]) + 1);
        squares[i].textContent = xTurn;
      } else if (winner == "") {
        oActions(Number([i]) + 1);
        squares[i].textContent = oTurn;
      }
    }
    checkWin();
  });
}

// Reset button
const button = document.querySelector("button");

const reset = () => {
  document.querySelector("body").classList.add("green");
  document.querySelector("body").classList.remove("blue");
  document.querySelector("h1").style.fontSize = "4rem";
  document.querySelector("h1").textContent = "Let's Play Tic Tac Toe!";
  document.querySelector(".message").textContent = 'Player "O" goes first...';

  turnCount = 1;
  winBool = false;
  winner = "";
  xCurrentSquares = [];
  oCurrentSquares = [];

  for (let i = 0; i < squares.length; i++) {
    squares[i].textContent = "";
  }
};

button.addEventListener("click", () => {
  reset();
});
