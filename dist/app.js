'use strict';

function handleKey(e) {
  if (e.key >= 0 && e.key <= 9) handleDigit(e.key);else if (e.key.match(/^[%/*+-]$/)) handleOperator(e.key);else if (e.key === '.') handleNegative();else if (e.key.match(/^=|Enter$/)) handleEquals();else if (e.key.match(/^Backspace|Delete|C$/i)) handleClear();
}

function handleDigit(key) {
  // const digit = (key >= 0 && key <= 9) ? key : this.textContent;
  var digit = typeof key === 'string' ? key : this.textContent;

  // Is this a brand new number, or add it to the end of what's already there?
  var toDisplay = freshStart(mainDisplay) ? digit : mainDisplay.textContent + digit;

  mainDisplay.textContent = toDisplay.slice(0, 11); // Ensure it's not too long
}

function handleOperator(key) {
  var operator = typeof key === 'string' ? key : this.textContent;

  if (operator === '*') operator = '×';

  // User wants to chain operations and avoid clicking Equals
  if (helperDisplay.textContent.match(/^[%/×+-]$/) && mainDisplay.textContent !== '') {
    var result = calculate();
    if (!isNaN(result)) {
      helperDisplay.textContent = result + ' ' + operator;
    } else {
      helperDisplay.textContent = '';
      mainDisplay.textContent = 'Error';
      return;
    }
  }
  // Or change the current operator
  else if (helperDisplay.textContent.match(/^[%/×+-]$/)) {
      helperDisplay.textContent = helperDisplay.textContent.slice(0, -1) + ' ' + operator;
    }
    // Or just add this operator
    else {
        helperDisplay.textContent = mainDisplay.textContent + ' ' + operator;
      }

  mainDisplay.textContent = '';
}

function handleNegative() {
  if (mainDisplay.textContent.startsWith('-')) {
    mainDisplay.textContent = '' + mainDisplay.textContent.slice(1, 11);
  } else {
    mainDisplay.textContent = '-' + mainDisplay.textContent.slice(0, 10);
  }

  // If it was 0 and user clicked neg, don't show the 0 anymore
  if (Number(mainDisplay.textContent) === 0) {
    mainDisplay.textContent = '' + mainDisplay.textContent.slice(0, -1);
  }
}

function handleEquals() {
  // If they're just clicking again, we don't need to do anything
  if (helperDisplay.textContent.endsWith('=')) return;

  var result = calculate();

  helperDisplay.textContent = helperDisplay.textContent + ' ' + mainDisplay.textContent + ' =';
  result === 'Error' ? displayResult(result) : displayResult(formatResult(Number(result)));
}

function handleClear() {
  mainDisplay.textContent = 0;
  helperDisplay.textContent = '';
}
'use strict';

var mainDisplay = document.querySelector('.main-display');
var helperDisplay = document.querySelector('.helper-display');
var allButtons = document.querySelectorAll('.calculator button');
var buttons = {
  digit: document.querySelectorAll('.digit'),
  operator: document.querySelectorAll('.operator'),
  clear: document.querySelector('.clear'),
  neg: document.querySelector('.neg'),
  equals: document.querySelector('.equals')
};

buttons.digit.forEach(function (num) {
  return num.addEventListener('click', handleDigit);
});
buttons.operator.forEach(function (op) {
  return op.addEventListener('click', handleOperator);
});
buttons.neg.addEventListener('click', handleNegative);
buttons.equals.addEventListener('click', handleEquals);
buttons.clear.addEventListener('click', handleClear);
document.addEventListener('keyup', handleKey);
'use strict';

function freshStart(display) {
  return display.classList.contains('answer') || display.textContent == 0 && !display.textContent.match(/[\.\-]/);
}

function calculate() {
  var op = helperDisplay.textContent.slice(-1) || '';
  var num1 = Number(helperDisplay.textContent.slice(0, -2)) || '';
  var num2 = Number(mainDisplay.textContent) || '';

  return doMaths(op, num1, num2);
}

function doMaths(op, num1, num2) {
  var result = void 0;
  if (divideByZero(op, num2)) result = 'Error';else if (op === '+') result = num1 + num2;else if (op === '-') result = num1 - num2;else if (op === '×') result = num1 * num2;else if (op === '/') result = num1 / num2;else if (op === '%') result = num1 * (num2 / 100);else result = Number(mainDisplay.textContent) || 0;

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

function displayResult() {
  var result = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  mainDisplay.classList.add('answer');
  mainDisplay.textContent = result;

  allButtons.forEach(function (btn) {
    return btn.addEventListener('click', clearAnswer);
  });
}

function clearAnswer() {
  if (this.classList.contains('equals')) return; // Don't change anything if the user clicked equals again

  mainDisplay.classList.remove('answer');
  allButtons.forEach(function (btn) {
    return btn.removeEventListener('click', clearAnswer);
  });

  // If they're doing another calculation, don't mess it up by clearing the display
  if (this.classList.contains('operator')) return;

  helperDisplay.textContent = '';
}
//# sourceMappingURL=app.js.map
