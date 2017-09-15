function freshStart(display) {
  return (display.classList.contains('answer') ||
    (display.textContent == 0 && !display.textContent.match(/[\.\-]/)));
}


function calculate() {
  const op = helperDisplay.textContent.slice(-1) || '';
  const num1 = Number(helperDisplay.textContent.slice(0, -2)) || '';
  const num2 = Number(mainDisplay.textContent) || '';

  return doMaths(op, num1, num2);
}


function doMaths(op, num1, num2) {
  let result;
  if (divideByZero(op, num2)) result = 'Error';
  else if (op === '+') result = num1 + num2;
  else if (op === '-') result = num1 - num2;
  else if (op === '×') result = num1 * num2;
  else if (op === '/') result = num1 / num2;
  else if (op === '%') result = num1 * (num2 / 100);
  else result = Number(mainDisplay.textContent) || 0;

  return result;
}


function divideByZero(op, num) {
  return (op === '/' && num == 0);
}


function formatResult(num) {
  return num
    .toFixed(10) // To string, not too long, properly rounded
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