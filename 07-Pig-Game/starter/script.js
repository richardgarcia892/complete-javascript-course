'use strict';

let scores, currentScore, activePlayer, playing;

const player0ActiveElement = document.querySelector('.player--0');
const player1ActiveElement = document.querySelector('.player--1');
const score0Element = document.querySelector('#score--0');
const score1Element = document.querySelector('#score--1');
const currentScore0Element = document.querySelector('#current--0');
const currentScore1Element = document.querySelector('#current--1');
const diceElement = document.querySelector('.dice');
const btnNewGame = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

function changePlayer() {
  player0ActiveElement.classList.toggle('player--active');
  player1ActiveElement.classList.toggle('player--active');
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  currentScore0Element.textContent = 0;
  currentScore1Element.textContent = 0;
}

function newGame() {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0Element.textContent = 0;
  score1Element.textContent = 0;
  currentScore1Element.textContent = 0;
  currentScore0Element.textContent = 0;

  player0ActiveElement.classList.add('player--active');
  player1ActiveElement.classList.remove('player--active');
  player0ActiveElement.classList.remove('player--winner');
  player1ActiveElement.classList.remove('player--winner');

  diceElement.classList.add('hidden');
}

function roll() {
  if (playing) {
    let roll = Math.trunc(Math.random() * (6 - 1) + 1);
    diceElement.src = `dice-${roll}.png`;
    diceElement.classList.remove('hidden');
    if (roll !== 1) {
      currentScore += roll;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      changePlayer();
    }
  }
}

function setWinner() {
  playing = false;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('player--winner');
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--active');
  diceElement.classList.add('hidden');
}

function hold() {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 20) {
      setWinner();
    } else {
      changePlayer();
    }
  }
}

btnRoll.addEventListener('click', roll);
btnHold.addEventListener('click', hold);
btnNewGame.addEventListener('click', newGame);

newGame();
