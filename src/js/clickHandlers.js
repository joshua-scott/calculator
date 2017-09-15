function handleDigit() {
  const digit = this.textContent;
  // Is this a brand new number, or add it to the end of what's already there?
  const toDisplay = freshStart(mainDisplay) ? digit : mainDisplay.textContent + digit;

  mainDisplay.textContent = toDisplay.slice(0, 11); // Ensure it's not too long
}


function handleOperator() {
  // User wants to chain operations and avoid clicking Equals
  if (helperDisplay.textContent.match(/[%/×+-]$/) && mainDisplay.textContent !== '') {
    const result = calculate();
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
  result === 'Error' ? displayResult(result) : displayResult(formatResult(result));
}


function handleClear() {
  mainDisplay.textContent = 0;
  helperDisplay.textContent = '';
}