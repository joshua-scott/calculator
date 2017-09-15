buttons.digit.forEach(num => num.addEventListener('click', handleDigit));
buttons.operator.forEach(op => op.addEventListener('click', handleOperator));
buttons.neg.addEventListener('click', handleNegative);
buttons.equals.addEventListener('click', handleEquals);
buttons.clear.addEventListener('click', handleClear);