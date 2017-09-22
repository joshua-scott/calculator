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

buttons.digit.forEach(num => num.addEventListener('click', handleDigit));
buttons.operator.forEach(op => op.addEventListener('click', handleOperator));
buttons.neg.addEventListener('click', handleNegative);
buttons.equals.addEventListener('click', handleEquals);
buttons.clear.addEventListener('click', handleClear);
document.addEventListener('keyup', handleKey);
