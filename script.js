const buttons = document.querySelectorAll(".btn");
const display = document.getElementsByClassName("displayValue")[0];
let currVal = "0";
let displayVal = "0";
let operator;
let resetDisplayVal = false;

for (let button of buttons) {
    button.addEventListener("click", (e) => handleClick(e));
}

function handleClick(e) {
    e.preventDefault();

    switch (e.target.id) {
        case "clear":
            handleClearBtn();
            break;
        case "negation":
            handleNegateBtn();
            break;
        case "percent":
            handlePercentBtn();
            break;
        case "divide":
        case "multiply":
        case "subtract":
        case "add":
        case "calculate":
            handleOperationBtn(e.target.id);
            break;
        default:
            handleValueBtn(e.target.innerText);
            break;
    }
}

function handleValueBtn(value) {
    if (displayVal === "0" && value === "0") {
        return;
    }

    if (value === "." && displayVal.indexOf(value) !== -1) {
        return;
    }

    if (resetDisplayVal) {
        displayVal = "0";
        resetDisplayVal = false;
    }

    if (displayVal.length === 7) {
        return;
    }
    
    if (displayVal === "0" && value !== ".") {
        displayVal = value;
    } else {
        displayVal += value;
    }

    updateDisplay();
}

function updateDisplay() {
    display.innerText = displayVal;
}

function handleClearBtn() {
    toggleBtnHighlight();
    currVal = "0";
    clearOperator();
    clearDisplay();
    resetDisplayVal = false;
}

function clearDisplay() {
    displayVal = "0";
    updateDisplay();
}

function handleOperationBtn(operation) {
    resetDisplayVal = true;
    
    if (operator) {
        operate(currVal, displayVal, operator);
        clearOperator();
    }

    currVal = displayVal;
    if (operation !== "calculate") {
        operator = operation;
        toggleBtnHighlight();
    }
}

function operate(firstVal, secondVal, operation) {
    firstVal = parseFloat(firstVal);
    secondVal = parseFloat(secondVal);

    switch (operation) {
        case "add":
            displayVal = add(firstVal, secondVal);
            break;
        case "subtract":
            displayVal = subtract(firstVal, secondVal);
            break;
        case "multiply":
            displayVal = multiply(firstVal, secondVal);
            break;
        case "divide":
            displayVal = divide(firstVal, secondVal);
            break;
    }

    updateDisplay();
}

function toggleBtnHighlight() {
    if (operator) {
        const operationBtn = document.getElementById(operator);
        operationBtn.classList.toggle("btn__operator--highlight");
    }
}

function handleNegateBtn() {
    let value = round(parseFloat(displayVal) * -1);

    if (value === 0) {
        return;
    }

    displayVal = value.toString();
    updateDisplay();
    clearOperator();
    resetDisplayVal = false;
}

function handlePercentBtn() {
    let value = round(parseFloat(displayVal) / 100);

    if (value === 0) {
        return;
    }

    displayVal = value.toString();
    updateDisplay();
    clearOperator();
    resetDisplayVal = false;
}

function clearOperator() {
    toggleBtnHighlight();
    operator = null;
}

function add(firstVal, secondVal) {
    return round(firstVal + secondVal)
}

function subtract(firstVal, secondVal) {
    return round(firstVal - secondVal);
}

function multiply(firstVal, secondVal) {
    return round(firstVal * secondVal);
}

function divide(firstVal, secondVal) {
    if (secondVal === 0) {
        return ">:(";
    }
    
    return round(firstVal / secondVal);
}

function round(value) {
    return Math.round(value * 10000000) / 10000000;
}