'use strict';

let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highscore = 0;

document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);

  if (score > 0) {
    if (!guess) {
      document.querySelector('.message').textContent = '⛔ Not a Number!';
    } else if (guess === secretNumber) {
      if (score > highscore) {
        highscore = score;
        document.querySelector('.highscore').textContent = highscore;
      }
      document.querySelector('body').style.backgroundColor = '#60b347';
      document.querySelector('.message').textContent = '🎉🎊 Correct number!!!';
      document.querySelector('.number').textContent = secretNumber;
      document.querySelector('.number').style.width = '30rem';
    } else if (1 <= guess <= 20) {
      score--;
      document.querySelector('.message').textContent =
        guess > secretNumber ? 'Number too high 👆' : 'Number too low 👇';
      document.querySelector('.score').textContent = score;
    }
  } else {
    document.querySelector('.message').textContent = "You've Lost the game!";
  }
});

document.querySelector('.again').addEventListener('click', function () {
  score = 20;
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.check').value = '';
  document.querySelector('.score').textContent = score;
  document.querySelector('.number').style.width = '15rem';
  document.querySelector('.number').textContent = '?';
  document.querySelector('.message').textContent = 'make your guess!';
});
