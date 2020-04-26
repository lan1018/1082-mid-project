const defaultResult = 0;
let currentResult = defaultResult;
let logEntries = [];

// Get input from input field
function getUserNumberInput() {
  return parseInt(userInput.value);
}

// Generate and write calculation log
function createAndWriteOutput(operator, initialResult, enterNumber) {
  const calcDescription = `${initialResult} ${operator} ${enterNumber}`;
  outputResult(currentResult, calcDescription);
}

function writeToLog(operation, prevResult, number, result) {
  logEntries.push({
    operation,
    prevResult,
    number,
    result
  });
  console.log(logEntries);
}

function calculatedResult(calculationType) {
  const enteredNumber = getUserNumberInput();
  const initialResult = currentResult;
  let mathOperator;
  if (calculationType === 'ADD') {
    currentResult += enteredNumber;
    mathOperator = '+';
  } else if (calculationType === 'SUBTRACT') {
    currentResult -= enteredNumber;
    mathOperator = '-';
  } else if (calculationType === 'MULTIPLY') {
    currentResult *= enteredNumber;
    mathOperator = '*';
  } else if (calculationType === 'DIVIDE') {
    currentResult /= enteredNumber;
    mathOperator = '/';
  }
  createAndWriteOutput(mathOperator, initialResult, enteredNumber);
  writeToLog(calculationType, initialResult, enteredNumber, currentResult);
}

function add() {
  calculatedResult('ADD');
}

function subtract() {
  calculatedResult('SUBTRACT');
}

function multiply() {
  calculatedResult('MULTIPLY');
}

function divide() {
  calculatedResult('DIVIDE');
}

addBtn.addEventListener('click', add);
subtractBtn.addEventListener('click', subtract);
multiplyBtn.addEventListener('click', multiply);
divideBtn.addEventListener('click', divide);
