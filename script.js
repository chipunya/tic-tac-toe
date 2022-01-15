"use strict";
const cellEls = document.querySelectorAll(".cell");
const restartBtn = document.querySelector(".restart");
const message = document.querySelector(".message");
const xClass = "x";
const oClass = "o";
const winningCombinations = [
  // horizontal
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  //vertical
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  //diagonal
  [0, 4, 8],
  [2, 4, 6],
];

let oTurn;

function startGame() {
  oTurn = false;
  message.innerHTML = "";
  cellEls.forEach((el) => {
    el.innerHTML = "";
    el.classList.remove("x", "o");
    el.addEventListener("click", handleClick);
  });
}
startGame();
restartBtn.addEventListener("click", startGame);

function handleClick(e) {
  console.log(e.target);
  const currentCell = e.target;
  //identidying className
  let currentCellTurn = oTurn ? oClass : xClass;
  //placing letter
  placeLetter(currentCell, currentCellTurn);
  //swapping turns
  oTurn = !oTurn;
  if (checkWinner(currentCellTurn)) {
    message.innerHTML = `${currentCellTurn.toUpperCase()} IS THE WINNER`;
    cellEls.forEach((cell) => cell.removeEventListener("click", handleClick));
  } else if (isDraw()) {
    message.innerHTML = "DRAW!";
  }
}

function placeLetter(cell, turn) {
  oTurn ? (cell.innerText = "O") : (cell.innerText = "X");
  cell.classList.add(turn);
  cell.removeEventListener("click", handleClick);
  message.innerHTML = oTurn ? "X's turn" : "O's turn";
}

function checkWinner(turn) {
  return winningCombinations.some((combination) => {
    return combination.every((index) => {
      return cellEls[index].classList.contains(turn);
    });
  });
}

function isDraw() {
  return [...cellEls].every((cell) => {
    return cell.classList.contains(xClass) || cell.classList.contains(oClass);
  });
}
