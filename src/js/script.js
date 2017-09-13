const buttons = document.querySelectorAll('.buttons button');
const topScreen = document.querySelector('.previous-input')
const bottomScreen = document.querySelector('.current-input')
let calculation = '';

function handleClick() {
  const clicked = this.dataset.content;
  if (clicked === 'C') {
    clearAll();
  } else if (clicked === '&#x2190;') {
    calculation = calculation.slice(0, -1);
  } else if (clicked === '=') {
    calculate();
  } else {
    calculation += clicked;
  }
}

buttons.forEach(btn => {
  btn.textContent = btn.dataset.content;
  btn.addEventListener('click', handleClick);
});