function handleKey(e) {
  if (e.key >= 0 && e.key <= 9) handleDigit(e.key);
  else if (e.key.match(/^[%/*+-]$/)) handleOperator(e.key);
  else if (e.key === '.') handleNegative();
  else if (e.key.match(/^=|Enter$/)) handleEquals();
  else if (e.key.match(/^Backspace|Delete|C$/i)) handleClear();
}

function handleDigit(key) {
  // const digit = (key >= 0 && key <= 9) ? key : this.textContent;
  const digit = typeof key === 'string' ? key : this.textContent;

  // Is this a brand new number, or add it to the end of what's already there?
  const toDisplay = freshStart(mainDisplay) ? digit : mainDisplay.textContent + digit;

  mainDisplay.textContent = toDisplay.slice(0, 11); // Ensure it's not too long
}


function handleOperator(key) {
  let operator = typeof key === 'string' ? key : this.textContent;

  if (operator === '*') operator = '×';

  // User wants to chain operations and avoid clicking Equals
  if (helperDisplay.textContent.match(/^[%/×+-]$/) && mainDisplay.textContent !== '') {
    const result = calculate();
    if (!isNaN(result)) {
      helperDisplay.textContent = `${result} ${operator}`;
    } else {
      helperDisplay.textContent = '';
      mainDisplay.textContent = 'Error';
      return;
    }
  }
  // Or change the current operator
  else if (helperDisplay.textContent.match(/^[%/×+-]$/)) {
    helperDisplay.textContent = `${helperDisplay.textContent.slice(0, -1)} ${operator}`;
  }
  // Or just add this operator
  else {
    helperDisplay.textContent = `${mainDisplay.textContent} ${operator}`;
  }

  mainDisplay.textContent = '';
}


function handleNegative() {
  if (mainDisplay.textContent.startsWith('-')) {
    mainDisplay.textContent = `${mainDisplay.textContent.slice(1, 11)}`;
  } else {
    mainDisplay.textContent = `-${mainDisplay.textContent.slice(0, 10)}`;
  }

  // If it was 0 and user clicked neg, don't show the 0 anymore
  if (Number(mainDisplay.textContent) === 0) {
    mainDisplay.textContent = `${mainDisplay.textContent.slice(0, -1)}`
  }
}


function handleEquals() {
  // If they're just clicking again, we don't need to do anything
  if (helperDisplay.textContent.endsWith('=')) return;

  const result = calculate();

  helperDisplay.textContent = `${helperDisplay.textContent} ${mainDisplay.textContent} =`;
  result === 'Error' ? displayResult(result) : displayResult(formatResult(Number(result)));
}


function handleClear() {
  mainDisplay.textContent = 0;
  helperDisplay.textContent = '';
}