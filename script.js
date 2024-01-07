const buttons = document.querySelectorAll(".btn");
const display = document.getElementsByClassName("displayValue")[0];
let firstVal;
let secondVal;
let operator;
let displayVal = "0";

for (let button of buttons) {
    button.addEventListener("click", (e) => handleClick(e));
}

function handleClick(e) {
    e.preventDefault();

    switch (e.target.id) {
        case "clear":
            clearDisplay();
            break;
        case "negation":
            console.log("neg");
            break;
        case "percent":
            console.log("percent");
            break;
        case "divide":
        case "multiply":
        case "subtract":
        case "add":
        case "equals":
            console.log("operation");
            break;
        default:
            handleValueChange(e.target.innerText);
            break;
    }
}

function handleValueChange(value) {
    if (displayVal === "0" && value === "0") {
        return;
    }

    if (value === "." && displayVal.indexOf(value) !== -1) {
        return;
    }
    
    if (displayVal === "0" && value !== ".") {
        displayVal = value;
    } else {
        displayVal += value;
    }

    updateDisplayValue();
}

function updateDisplayValue() {
    display.innerText = displayVal;
}

function clearDisplay() {
    displayVal = "0";
    updateDisplayValue();
}
