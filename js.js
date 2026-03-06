//Calculator memory//

let currentOperand = "0";
let previousOperand = "";
let operator = null
let shouldResetScreen = false;

//DOM//

const currentDisplay = document.getElementById("current-operand");
const previousDisplay = document.getElementById("previous-operand");


//Event Listeners//

document.querySelectorAll(".number").forEach(btn => {
    btn.addEventListener("click", () => 
        appendNumber(btn.dataset.number));
});

document.querySelectorAll(".operator").forEach(btn => {
    btn.addEventListener("click", () => chooseOperator(btn.dataset.operator));
});

document.getElementById('equals').addEventListener('click', calculate);
document.getElementById('clear').addEventListener('click', clearAll);
document.getElementById('delete').addEventListener('click', deleteLast);



//Functions//

function updateDisplay() {
    currentDisplay.textContent = currentOperand;
    previousDisplay.textContent = previousOperand + 
    (operator ? ` ${operator}` : ``);
}

//Start new number if user input operator//
function appendNumber(number) {
    if (shouldResetScreen) {
        currentOperand = "";
        shouldResetScreen = false;
    }
//Prevent multiple decimal points//
    if (number === "." && currentOperand.includes(".")) return;
//No leading 0//
if (currentOperand === "0" && number !== ".") {
    currentOperand = number;
} else {
    currentOperand += number;
}
updateDisplay();
}

function calculate() {
    if (!operator || previousOperand === "") return;

    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    let result;

    switch(operator) {
        case "+": result = prev + current; break;
        case "-": result = prev - current; break;
        case "*": result = prev * current; break;
        case "÷": //Divide by 0 check//
            if (current === 0) {
                currentOperand = "Error";
                operator = null;
                previousOperand = "";
                updateDisplay();
                return;
            }
            result = previous / current;
            break;
    }
    //Limits floating numbers to ten decimal places//
    currentOperand = parseFloat(result.toFixed(10)).toString();
    operator = null;
    previousOperand = "";
    shouldResetScreen = true;
    updateDisplay();
}

function chooseOperator(op) {
    //Calculate operation first to enable chaining operations//
    if (previousOperand !== "" && !shouldResetScreen) {
        calculate();
    }

operator = op;
previousOperand = currentOperand;
shouldResetScreen = true; //Clear screen with next number//
updateDisplay();
}

function clearAll() {
    currentOperand = "0";
    previousOperand = "";
    operator = null;
    shouldResetScreen = false;
    updateDisplay();
}

//Delete last number entered//
function deleteLast() {
    if (currentOperand.length === 1 || currentOperand === "Error") {
        currentOperand = "0";
    } else {
        currentOperand = currentOperand.slice(0, -1);
    }
    updateDisplay();
}


