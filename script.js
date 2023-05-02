// Numbers
let num1 = null;
let num2 = null;
let currentNumField = document.querySelector(".current-num");
let currentNum = 1;

// Buttons
let selectedOperation = null;

let operators = document.querySelectorAll('.operator');
for (var i = 0; i < operators.length; i++) {
    operators.item(i).addEventListener('click', operate);
}
let numbers = document.querySelectorAll('.number');
for (var i = 0; i < numbers.length; i++)    {
    numbers.item(i).addEventListener('click', inputNum)
}
let clearButton = document.querySelector(".clear");
clearButton.addEventListener('click', clear);

let delButton = document.querySelector(".delete");
delButton.addEventListener('click', del);

// change background color on mousedown, then back on mouseup
let buttons = document.querySelectorAll('button');
for (var i = 0; i < buttons.length; i++) {
    let currentButton = buttons.item(i);
    currentButton.addEventListener('mousedown', function() { currentButton.style.backgroundColor = "var(--clicked)"; });
    currentButton.addEventListener('mouseup', function() { currentButton.style.backgroundColor = "var(--buttons)"; });
}

// choose operator
function operate()  {
    // no number entered
    if (num1 == null || (num1 == null && num2 == null))   {
        console.log("can't do operations without a number");
        return;
    }
    // first number entered
    if (num1 != null && num2 == null)   {
        // equal sign entered immediately after first number
        if (this.textContent == '=')  {
            console.log("can't compute with just one number");
            return;
        }
        // +/-/×/÷ entered after first number
        else    {
            switch (this.textContent) {
                case '+':
                    selectedOperation = "+";
                    highlight(".add");
                    break;
                case '-':
                    selectedOperation = "-";
                    highlight(".subtract");
                    break;
                case '×':
                    selectedOperation = "*";
                    highlight(".multiply");
                    break;
                case '÷':
                    selectedOperation = "/";
                    highlight(".divide");
                    break;
            }
            currentNum = 2;
            return;
        }
    }

    // second number entered
    if (num1 != null && num2 != null)   {
        switch (this.textContent) {
            case '=':
                num1 = compute(selectedOperation, num1, num2);
                num2 = null;
                selectedOperation = null;
                currentNum = 1;
                resetHighlight();
                break;
            case '+':
                num1 = compute(selectedOperation, num1, num2);
                num2 = null;
                selectedOperation = '+';
                currentNum = 2;
                highlight(".add");
                break;
            case '-':
                num1 = compute(selectedOperation, num1, num2);
                num2 = null;
                selectedOperation = '-';
                currentNum = 2;
                highlight(".subtract");
                break;
            case '×':
                num1 = compute(selectedOperation, num1, num2);
                num2 = null;
                selectedOperation = '*';
                currentNum = 2;
                highlight(".multiply");
                break;
            case '÷':
                num1 = compute(selectedOperation, num1, num2);
                num2 = null;
                selectedOperation = '/';
                currentNum = 2;
                highlight(".divide");
                break;
        }
        currentNumField.textContent = num1;
        return;
    }
}

// enter a number (either the first or the second)
function inputNum() {
    if (currentNum == 1)   {
        if (num1 == null)   {
            // add a 0 at the start if the field is empty and a decimal point is added
            if (this.textContent == '.')    { 
                num1 = "0."; 
                currentNumField.textContent = num1; 
                return;
            }
            num1 = this.textContent;
        }
        else    {
            // disregard it when the '.' button is clicked and there is already a decimal point in the number
            if (this.textContent == '.' && num1.includes('.')) {
                return;
            }
            // impose a 15-character limit on numbers
            if (num1.length == 15)    {
                return;
            }
            // add a digit to the number
            num1 = num1+""+this.textContent;
        }
        if (num1 == "Infinity") {
            return;
        }
        currentNumField.textContent = num1;
    }
    if (currentNum == 2)    {
        if (num2 == null)   {
            // add a 0 at the start if the field is empty and a decimal point is added
            if (this.textContent == '.')    { num2 = "0.";
                currentNumField.textContent = num2;
                return;
            }
            num2 = this.textContent;
        }
        else    {
            // disregard it when the '.' button is clicked and there is already a decimal point in the number
            if (this.textContent == '.' && num2.includes('.')) {
                return;
            }
            // impose a 15-character limit on numbers
            if (num2.length == 15)    {
                return;
            }
            // add a digit to the number
            num2 = num2+""+this.textContent; 
        }
        currentNumField.textContent = num2;
    }
    return;
}

// make computations based on the two numbers and the operators
function compute(selectedOperation, num1, num2)  {
    switch (selectedOperation)  {
        case '+':
            finalNum = Number(num1)+Number(num2);
            break;
        case '-':
            finalNum = num1-num2;
            break;
        case '*':
            finalNum = num1*num2;
            break;
        case '/':
            finalNum = num1/num2;
            break;
    }
    // format numbers longer than 15
    if ((finalNum+"").length > 15)   {
        console.log(finalNum);
        console.log("boogsh");
        finalNum = finalNum.toExponential(6);
    }
    return finalNum;
}

// clear everything
function clear()    {
    num1 = null;
    num2 = null;
    currentNum = 1;
    currentNumField.textContent = "";
}
// remove the last digit of the current number
function del()  {
    if (currentNum == 1)    {
        num1 = num1+"";
        if (num1 == "null") {
            num1 = null;
            return;
        }
        num1 = num1.slice(0, num1.length-1);
        currentNumField.textContent = num1;
    }
    if (currentNum == 2)    {
        num2 = num2.slice(0, num2.length-1);
        currentNumField.textContent = num2;
    }
    return;
}

// highlight which operator is selected
function highlight(operatorName)    {
    resetHighlight();

    let operator = document.querySelector(operatorName);
    operator.style.backgroundColor = "var(--selected)";
}

// remove operator highlights
// this could be used when a different operator is selected, or when something is computed
function resetHighlight()   {
    let operators = document.querySelectorAll('.operator');
    for (var i = 0; i < operators.length; i++) {
        operators.item(i).style.backgroundColor = "var(--buttons)";
    }
}