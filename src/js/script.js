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
  mainDisplay.textContent = `-${mainDisplay.textContent.slice(0, 10)}`;
}

function calculate() {

  if (helperDisplay.textContent === '') {
    newCalculation = true;
    return;
  }

  const op = helperDisplay.textContent.slice(-1);

  const num1 = Number(helperDisplay.textContent.slice(0, -2)) || 0;
  const num2 = Number(mainDisplay.textContent);
  console.log({
    op,
    num1,
    num2
  });

  let result;

  if (op === '+') {
    result = num1 + num2;
  } else if (op === '-') {
    result = num1 - num2;
  } else if (op === '×') {
    result = num1 * num2;
  } else if (op === '/') {
    if (num2 === 0) {
      helperDisplay.textContent = '';
      mainDisplay.textContent = 'Error';
      newCalculation = true;
      return;
    }
    result = num1 / num2;
  } else if (op === '%') {
    result = num1 * (num2 / 100);
  }

  console.log({
    result
  });
  const output = formatResult(result);
  console.log({
    output
  });

  helperDisplay.textContent = '';
  mainDisplay.textContent = output;
  newCalculation = true;
}

function formatResult(num) {
  // Convert to string, max of 11 digits, properly rounded
  let output = num.toFixed(11);
  // Remove any trailing zeroes, if they exist
  output = output.replace(/0+$/, '');
  // Remove trailing period, if it exists
  output = output.replace(/\.$/, '');
  return output;
}

buttons.digit.forEach(num => num.addEventListener('click', handleDigit));
buttons.operator.forEach(op => op.addEventListener('click', handleOperator));
buttons.clear.addEventListener('click', clear);
buttons.neg.addEventListener('click', toggleNegative);
buttons.equals.addEventListener('click', calculate);