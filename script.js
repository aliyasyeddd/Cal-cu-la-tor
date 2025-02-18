let firstNumber = "";
let secondNumber = "";
let currentOperator = "";
let resetDisplay = false;
let hasDecimal = false;

const display = document.querySelector("#display");
const digitButton = document.querySelectorAll("#digit");
const operatorButtons = document.querySelectorAll("#operator");
const equalsButton = document.querySelector("#equals");
const decimal = document.querySelector("#decimalBtn");
const backSpaceBtn = document.querySelector("#backSpaceBtn");


digitButton.forEach((button) =>
  button.addEventListener("click", () => appendNumber(button.innerText))
);
operatorButtons.forEach((button) =>
  button.addEventListener("click", () => setOperator(button.innerText))
);
equalsButton.addEventListener("click", calculateResult);

function operate(operator, a, b) {
  let result;
  a = parseFloat(a);
  b = parseFloat(b);

  switch (operator) {
    case "+":
      result = a + b;
      break;
    case "-":
      result = a - b;
      break;
    case "*":
      result = a * b;
      break;
    case "/":
      if (b === 0) return "Nice try... can't divide by zero!";
      result = a / b;
      break;
    default:
      result = "invalid operator";
  }
  return Math.round(result * 1000) / 1000;
}

function appendNumber(num) {
  if (display.innerText === "0" || resetDisplay) {
    display.innerText = num;
    resetDisplay = false;
  } else {
    display.innerText += num;
  }
}

decimal.addEventListener("click", () => {
  if (!display.innerText.includes(".")) { 
      display.innerText += ".";
      decimal.disabled = true; 
  }
  hasDecimal = true
});

function setOperator(operator) {
  if (firstNumber === "") {
    firstNumber = firstNumber = display.innerText;
  } else if (currentOperator && secondNumber === "") {
    currentOperator = operator; // Replace last operator if pressed consecutively
    return;
  } else if (currentOperator) {
    secondNumber = display.innerText;
    firstNumber = operate(currentOperator, firstNumber, secondNumber);
    display.innerText = firstNumber;
  }
  currentOperator = operator;
  resetDisplay = true;
  hasDecimal = false;
}

function calculateResult() {
  if (currentOperator  === "") alert("Please enter any operator or number to calculate");

  secondNumber = display.innerText;
  let result = operate(currentOperator, firstNumber, secondNumber);
  display.innerText = result;
  firstNumber = result;
  currentOperator = "";
  hasDecimal = result.toString().includes(".");
}

backSpaceBtn.addEventListener("click", () => {
  display.innerText = display.innerText.slice(0, -1); 
});

function clearDisplay() {
  display.innerText = "0";
  firstOperand = "";
  secondOperand = "";
  currentOperator = "";
  resetDisplay = false;
  hasDecimal = false;
  decimal.disabled = false;
}
