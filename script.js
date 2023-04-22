'use strict';

//Selecting the elements
const player0EL = document.querySelector('.player--0');
const player1EL = document.querySelector('.player--1');
const score0EL = document.getElementById('score--0');
const score1EL = document.getElementById('score--1');
const curr0EL = document.getElementById('current--0');
const curr1EL = document.getElementById('current--1');
const diceEL = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let score = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let isPlaying = true;
// Starting value of the elements
score0EL.textContent = 0;
score1EL.textContent = 0;
diceEL.classList.add('hidden');

// Rolling dice functionality
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0EL.classList.toggle('player--active');
  player1EL.classList.toggle('player--active');
};

btnRoll.addEventListener('click', function () {
  if (isPlaying) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceEL.classList.remove('hidden');
    diceEL.src = `dice-${dice}.png`;

    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

// Holding dice functionality
btnHold.addEventListener('click', function () {
  if (isPlaying) {
    score[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      score[activePlayer];

    if (score[activePlayer] >= 30) {
      isPlaying = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});

// Resetting the game functionality
btnNew.addEventListener('click', function () {
  diceEL.classList.add('hidden');
  score = [0, 0];
  currentScore = 0;
  isPlaying = true;
  score0EL.textContent = 0;
  score1EL.textContent = 0;
  curr0EL.textContent = 0;
  curr1EL.textContent = 0;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');

  activePlayer = 0;
});
