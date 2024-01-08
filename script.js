const buttons = document.querySelectorAll(".btn");
const display = document.getElementsByClassName("displayValue")[0];
let currVal = "0";
let displayVal = "0";
let operator;
let bClearDisplay = false;

for (let button of buttons) {
    button.addEventListener("click", (e) => handleClick(e));
}

function handleClick(e) {
    e.preventDefault();
    
    // if (operator) {
    //     toggleBtnHighlight(operator);   
    // }

    switch (e.target.id) {
        case "clear":
            handleClearBtn();
            break;
        case "negation":
            handleNegateBtn();
            break;
        case "percent":
            console.log("percent");
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

    if (bClearDisplay) {
        clearDisplay();
        bClearDisplay = false;
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
    // toggleBtnHighlight();
    currVal = "0";
    operator = null;
    clearDisplay();
}

function clearDisplay() {
    displayVal = "0";
    updateDisplay();
}

function handleOperationBtn(operation) {
    bClearDisplay = true;
    // if (operation !== "calculate") {
    //     toggleBtnHighlight(operation);
    // }
    
    if (operator) {
        calculate(currVal, displayVal, operator);
    }

    currVal = displayVal;
    operator = operation === "calculate" ? null : operation;
}

function calculate(firstVal, secondVal, operation) {
    firstVal = parseFloat(firstVal);
    secondVal = parseFloat(secondVal);

    switch (operation) {
        case "add":
            displayVal = firstVal + secondVal;
            break;
        case "subtract":
            displayVal = firstVal - secondVal;
            break;
        case "multiply":
            displayVal = firstVal * secondVal;
            break;
        case "divide":
            displayVal = firstVal / secondVal;
            break;
    }

    updateDisplay();
}

function toggleBtnHighlight(operation) {
    const operationBtn = document.getElementById(operation);
    operationBtn.classList.toggle("btn__operator--highlight");
}

function handleNegateBtn() {
    let value = parseFloat(displayVal) * -1;

    if (value === 0) {
        return;
    }

    displayVal = value.toString();
    updateDisplay();
}
