'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModel = document.querySelector('.close-modal');
const btnOpenModal = document.querySelectorAll('.show-modal');

function openModal() {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
}

function closeModal() {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
}

btnOpenModal.forEach(button => {
  console.log(button.textContent);
  button.addEventListener('click', openModal);
});

btnCloseModel.addEventListener('click', closeModal);

document.addEventListener('keydown', function (key) {
  if (key.key === 'Escape' && !modal.classList.contains('hidden')) closeModal();
});
