const buttons = {
  digit: document.querySelectorAll('button.digit'),
  operator: document.querySelectorAll('button.operator'),
  clear: document.querySelector('button.clear'),
  neg: document.querySelector('button.neg'),
  equals: document.querySelector('button.equals')
};

const mainDisplay = document.querySelector('.main-display');
const helperDisplay = document.querySelector('.helper-display');
let newCalculation = true;

function handleDigit() {
  if (mainDisplay.textContent.length > 11) return;
  if (Number(mainDisplay.textContent) === 0 || newCalculation) {
    mainDisplay.textContent = this.textContent;
  } else if (this.textContent === '.' && mainDisplay.textContent.includes('.')) {
    return;
  } else {
    mainDisplay.textContent += this.textContent;
  }
  newCalculation = false;
}

function handleOperator() {
  newCalculation = false;
  helperDisplay.textContent = `${mainDisplay.textContent} ${this.textContent}`;
  mainDisplay.textContent = '';
}

function clear() {
  mainDisplay.textContent = 0;
  helperDisplay.textContent = '';
}

function toggleNegative() {
  newCalculation = false;

  if (mainDisplay.textContent.startsWith('-')) {
    mainDisplay.textContent = `${mainDisplay.textContent.slice(1, 11)}`;
  } else {
    mainDisplay.textContent = `-${mainDisplay.textContent.slice(0, 10)}`;
  }
}

function calculate() {
  // Nothing to calculate
  if (helperDisplay.textContent === '') {
    newCalculation = true;
    return;
  }

  const op = helperDisplay.textContent.slice(-1);
  const num1 = Number(helperDisplay.textContent.slice(0, -2));
  const num2 = Number(mainDisplay.textContent);

  // Divide by zero error
  if (op === '/' && num2 === 0) {
    helperDisplay.textContent = '';
    mainDisplay.textContent = 'Error';
    newCalculation = true;
    return;
  }

  const result = doMaths(op, num1, num2);
  const output = formatResult(result);

  helperDisplay.textContent = '';
  mainDisplay.textContent = output;
  newCalculation = true;
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
  return num
    .toFixed(11) // To string, not too long, properly rounded
    .replace(/0+$/, '') // Remove any trailing zeroes
    .replace(/\.$/, ''); // Remove trailing period
}

buttons.digit.forEach(num => num.addEventListener('click', handleDigit));
buttons.operator.forEach(op => op.addEventListener('click', handleOperator));
buttons.clear.addEventListener('click', clear);
buttons.neg.addEventListener('click', toggleNegative);
buttons.equals.addEventListener('click', calculate);