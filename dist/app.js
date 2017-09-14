'use strict';

const mainDisplay = document.querySelector('.main-display');
const helperDisplay = document.querySelector('.helper-display');
const buttons = {
  digit: document.querySelectorAll('button.digit'),
  operator: document.querySelectorAll('button.operator'),
  clear: document.querySelector('button.clear'),
  neg: document.querySelector('button.neg'),
  equals: document.querySelector('button.equals')
};

function handleDigit() {
  if (mainDisplay.textContent.length > 11) return;
  if (Number(mainDisplay.textContent) === 0) {
    mainDisplay.textContent = this.textContent;
  } else if (this.textContent === '.' && mainDisplay.textContent.includes('.')) {
    return;
  } else {
    mainDisplay.textContent += this.textContent;
  }
}

function handleOperator() {
  helperDisplay.textContent = `${mainDisplay.textContent} ${this.textContent}`;
  mainDisplay.textContent = '';
}

function clear() {
  mainDisplay.textContent = 0;
  helperDisplay.textContent = '';
}

function toggleNegative() {
  if (mainDisplay.textContent.startsWith('-')) {
    mainDisplay.textContent = `${mainDisplay.textContent.slice(1, 11)}`;
  } else {
    mainDisplay.textContent = `-${mainDisplay.textContent.slice(0, 10)}`;
  }
}

function calculate() {
  // Nothing to calculate
  if (helperDisplay.textContent === '') {
    return;
  }

  const op = helperDisplay.textContent.slice(-1);
  const num1 = Number(helperDisplay.textContent.slice(0, -2));
  const num2 = Number(mainDisplay.textContent);

  // Divide by zero error
  if (op === '/' && num2 === 0) {
    helperDisplay.textContent = '';
    mainDisplay.textContent = 'Error';
    return;
  }

  const result = doMaths(op, num1, num2);
  const output = formatResult(result);

  displayAnswer(output);
}

function doMaths(op, num1, num2) {
  let result;
  if (op === '+') {
    result = num1 + num2;
  } else if (op === '-') {
    result = num1 - num2;
  } else if (op === '×') {
    result = num1 * num2;
  } else if (op === '/') {
    result = num1 / num2;
  } else if (op === '%') {
    result = num1 * (num2 / 100);
  }
  return result;
}

function formatResult(num) {
  return num.toFixed(11) // To string, not too long, properly rounded
  .replace(/0+$/, '') // Remove any trailing zeroes
  .replace(/\.$/, ''); // Remove trailing period
}

function displayAnswer(ans) {
  mainDisplay.classList.add('answer');
  helperDisplay.textContent = '';
  mainDisplay.textContent = ans;

  document.querySelectorAll('.calculator button').forEach(btn => {
    btn.addEventListener('click', clearAnswer);
  });
}

function clearAnswer() {
  if (this.classList.contains('equals')) return; // Don't change anything if the user clicked equals again

  document.querySelectorAll('.calculator button').forEach(btn => {
    btn.removeEventListener('click', clearAnswer);
  });
  mainDisplay.classList.remove('answer');
  mainDisplay.textContent = this.classList.contains('operator') ? '' : 0;
}

buttons.digit.forEach(num => num.addEventListener('click', handleDigit));
buttons.operator.forEach(op => op.addEventListener('click', handleOperator));
buttons.clear.addEventListener('click', clear);
buttons.neg.addEventListener('click', toggleNegative);
buttons.equals.addEventListener('click', calculate);
//# sourceMappingURL=app.js.map
