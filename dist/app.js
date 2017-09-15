'use strict';

const mainDisplay = document.querySelector('.main-display');
const helperDisplay = document.querySelector('.helper-display');
const allButtons = document.querySelectorAll('.calculator button');
const buttons = {
  digit: document.querySelectorAll('.digit'),
  operator: document.querySelectorAll('.operator'),
  clear: document.querySelector('.clear'),
  neg: document.querySelector('.neg'),
  equals: document.querySelector('.equals')
};

function handleDigit() {
  const digit = this.textContent;
  // Is this a brand new number, or add it to the end of what's already there?
  const toDisplay = freshStart(mainDisplay) ? digit : mainDisplay.textContent + digit;

  mainDisplay.textContent = toDisplay.slice(0, 11); // Ensure it's not too long
}

function freshStart(display) {
  return display.classList.contains('answer') || display.textContent == 0 && !display.textContent.match(/[\.\-]/);
}

function handleOperator() {
  // User wants to chain operations and avoid clicking Equals
  if (helperDisplay.textContent.match(/[%/×+-]$/) && mainDisplay.textContent !== '') {
    const result = chainCalculation();
    helperDisplay.textContent = `${result} ${this.textContent}`;
  }
  // Or change the current operator
  else if (helperDisplay.textContent.match(/[%/×+-]$/)) {
      helperDisplay.textContent = `${helperDisplay.textContent.slice(0, -1)} ${this.textContent}`;
    }
    // Or just add this operator
    else {
        helperDisplay.textContent = `${mainDisplay.textContent} ${this.textContent}`;
      }

  mainDisplay.textContent = '';
}

function chainCalculation() {
  const op = helperDisplay.textContent.slice(-1) || '';
  const num1 = Number(helperDisplay.textContent.slice(0, -2)) || '';
  const num2 = Number(mainDisplay.textContent) || '';

  return doMaths(op, num1, num2);
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

  // If it was 0 and user clicked neg, don't show the 0 anymore
  if (Number(mainDisplay.textContent) === 0) {
    mainDisplay.textContent = `${mainDisplay.textContent.slice(0, -1)}`;
  }
}

function calculate() {
  const op = helperDisplay.textContent.slice(-1) || '';
  const num1 = Number(helperDisplay.textContent.slice(0, -2)) || '';
  const num2 = Number(mainDisplay.textContent) || '';

  const result = doMaths(op, num1, num2);

  helperDisplay.textContent = `${helperDisplay.textContent} ${mainDisplay.textContent} =`;
  result === 'Error' ? displayResult(result) : displayResult(formatResult(result));
}

function doMaths(op, num1, num2) {
  let result;
  if (divideByZero(op, num2)) {
    result = 'Error';
  } else if (op === '+') {
    result = num1 + num2;
  } else if (op === '-') {
    result = num1 - num2;
  } else if (op === '×') {
    result = num1 * num2;
  } else if (op === '/') {
    result = num1 / num2;
  } else if (op === '%') {
    result = num1 * (num2 / 100);
  } else {
    result = Number(mainDisplay.textContent) || 0;
  }
  return result;
}

function divideByZero(op, num) {
  return op === '/' && num == 0;
}

function formatResult(num) {
  return num.toFixed(10) // To string, not too long, properly rounded
  .replace(/0+$/, '') // Remove any trailing zeroes
  .replace(/\.$/, '') // Remove trailing period
  .slice(0, 10); // Necessary if it's a really big number with lots of decimals
}

function displayResult(result = '') {
  mainDisplay.classList.add('answer');
  mainDisplay.textContent = result;

  allButtons.forEach(btn => btn.addEventListener('click', clearAnswer));
}

function clearAnswer() {
  if (this.classList.contains('equals')) return; // Don't change anything if the user clicked equals again

  mainDisplay.classList.remove('answer');
  allButtons.forEach(btn => btn.removeEventListener('click', clearAnswer));

  // If they're doing another calculation, don't mess it up by clearing the display
  if (this.classList.contains('operator')) return;

  helperDisplay.textContent = '';
}

buttons.digit.forEach(num => num.addEventListener('click', handleDigit));
buttons.operator.forEach(op => op.addEventListener('click', handleOperator));
buttons.clear.addEventListener('click', clear);
buttons.neg.addEventListener('click', toggleNegative);
buttons.equals.addEventListener('click', calculate);
//# sourceMappingURL=app.js.map
