"use strict";

//! install section

const installFun = function () {
  const namePlayer1Install = document.querySelector("#install-1");
  const namePlayer2Install = document.querySelector("#install-2");
  if (namePlayer1Install.value && namePlayer2Install.value) {
    document.querySelector("#name--0").textContent = namePlayer1Install.value;
    document.querySelector("#name--1").textContent = namePlayer2Install.value;
  } else if (namePlayer1Install.value || namePlayer2Install.value) {
    if (namePlayer1Install.value) {
      document.querySelector("#name--0").textContent = namePlayer1Install.value;
      document.querySelector("#name--1").textContent = "player 2";
    } else if (namePlayer2Install.value) {
      document.querySelector("#name--1").textContent = namePlayer2Install.value;
      document.querySelector("#name--0").textContent = "player 1";
    }
  } else {
    document.querySelector("#name--0").textContent = "player 1";
    document.querySelector("#name--1").textContent = "player 2";
  }
  document.querySelector(".install").classList.add("hidden");
};

document.addEventListener("keydown", function (x) {
  if (x.key === "Enter" || x.key === "Escape") {
    x.key === "Enter"
      ? installFun()
      : document.querySelector(".install").classList.add("hidden");
  }
});
document.querySelector(".install-btn").addEventListener("click", installFun);

// ! finish section install

// save element im variable
const scorePlayer1 = document.getElementById("score--0");
const scorePlayer2 = document.getElementById("score--1");

const diceimg = document.querySelector(".dice");

const btnRoll = document.querySelector(".btn--roll");
const btnNew = document.querySelector(".btn--new");
const btnHold = document.querySelector(".btn--hold");

const currentPlayer1 = document.getElementById("current--0");
const currentPlayer2 = document.getElementById("current--1");

const sectionPlayer1 = document.querySelector(".player--0");
const sectionPlayer2 = document.querySelector(".player--1");

const scoreWin = 50;

// creted varible for function
let scoreCurrent = 0;

// created function for clean code
const removeElement = function (nameElement) {
  nameElement.classList.add("hidden");
};

const removeClass = function (nameElement, nameClass) {
  nameElement.classList.remove(nameClass);
};

const addClass = function (nameElement, nameClass) {
  nameElement.classList.add(nameClass);
};

// set utilities
scorePlayer1.textContent = "0";
scorePlayer2.textContent = "0";
removeElement(diceimg); // remove dice  : use function

// * if btn dice click :
// create random number if !== 1 : add to cuurent else : current=0 and change player

btnRoll.addEventListener("click", function () {
  const diceRandom = Math.trunc(Math.random() * 6) + 1;

  diceimg.src = `./img/dice-${diceRandom}.png`;
  if (
    Number(scorePlayer1.textContent) >= scoreWin ||
    Number(scorePlayer2.textContent) >= scoreWin
  ) {
    removeElement(diceimg);
  } else {
    // diceimg.classList.remove("hidden");
    removeClass(diceimg, "hidden");

    if (diceRandom !== 1) {
      scoreCurrent += diceRandom;
      if (sectionPlayer1.classList.contains("player--active")) {
        currentPlayer1.textContent = scoreCurrent;
      } else if (sectionPlayer2.classList.contains("player--active")) {
        currentPlayer2.textContent = scoreCurrent;
      }
    } else {
      if (sectionPlayer1.classList.contains("player--active")) {
        // sectionPlayer1.classList.remove("player--active");
        removeClass(sectionPlayer1, "player--active");
        // sectionPlayer2.classList.add("player--active");
        addClass(sectionPlayer2, "player--active");
        currentPlayer1.textContent = 0;
        scoreCurrent = 0;
      } else if (sectionPlayer2.classList.contains("player--active")) {
        // sectionPlayer2.classList.remove("player--active");
        removeClass(sectionPlayer2, "player--active");
        // sectionPlayer1.classList.add("player--active");
        addClass(sectionPlayer1, "player--active");
        currentPlayer2.textContent = 0;
        scoreCurrent = 0;
      }
    }
  }
});

//* if btn hold click :
btnHold.addEventListener("click", function () {
  if (
    Number(scorePlayer1.textContent) >= scoreWin ||
    Number(scorePlayer2.textContent) >= scoreWin
  ) {
    removeElement(diceimg);
  } else {
    if (sectionPlayer1.classList.contains("player--active")) {
      scorePlayer1.textContent =
        Number(scorePlayer1.textContent) + Number(currentPlayer1.textContent);

      currentPlayer1.textContent = 0;
      if (Number(scorePlayer1.textContent) >= scoreWin) {
        sectionPlayer1.classList.add("player--winner");
        addClass();
        removeElement(diceimg);
      } else {
        sectionPlayer1.classList.toggle("player--active");
        // sectionPlayer1.classList.remove("player--active");
        sectionPlayer2.classList.toggle("player--active");
        // sectionPlayer2.classList.add("player--active");
        scoreCurrent = 0;
      }
    } else if (sectionPlayer2.classList.contains("player--active")) {
      scorePlayer2.textContent =
        Number(scorePlayer2.textContent) + Number(currentPlayer2.textContent);
      currentPlayer2.textContent = 0;
      if (Number(scorePlayer2.textContent) >= scoreWin) {
        // sectionPlayer2.classList.add("player--winner");
        addClass(sectionPlayer2, "player--winner");
        removeElement(diceimg);
      } else {
        // sectionPlayer2.classList.remove("player--active");
        removeClass(sectionPlayer2, "player--active");
        // sectionPlayer1.classList.add("player--active");
        addClass(sectionPlayer1, "player--active");
        scoreCurrent = 0;
      }
    }
  }
});

// * if btn newgame click :
btnNew.addEventListener("click", function () {
  scoreCurrent = 0;
  scorePlayer1.textContent = 0;
  scorePlayer2.textContent = 0;
  currentPlayer1.textContent = 0;
  currentPlayer2.textContent = 0;
  // sectionPlayer1.classList.remove("player--winner");
  removeClass(sectionPlayer1, "player--winner");
  // sectionPlayer2.classList.remove("player--winner");
  removeClass(sectionPlayer2, "player--winner");
  // sectionPlayer1.classList.add("player--active");
  addClass(sectionPlayer1, "player--active");
  // sectionPlayer2.classList.remove("player--active");
  removeClass(sectionPlayer2, "player--active");
  removeFunction(sectionPlayer2, "player--active");
  removeElement(diceimg);
});
