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
                    break;
                case '-':
                    selectedOperation = "-";
                    break;
                case '×':
                    selectedOperation = "*";
                    break;
                case '÷':
                    selectedOperation = "/";
                    break;
            }
            console.log(selectedOperation); // delete later
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
                break;
            case '+':
                num1 = compute(selectedOperation, num1, num2);
                num2 = null;
                selectedOperation = '+';
                currentNum = 2;
                break;
            case '-':
                num1 = compute(selectedOperation, num1, num2);
                num2 = null;
                selectedOperation = '-';
                currentNum = 2;
                break;
            case '×':
                num1 = compute(selectedOperation, num1, num2);
                num2 = null;
                selectedOperation = '*';
                currentNum = 2;
                break;
            case '÷':
                num1 = compute(selectedOperation, num1, num2);
                num2 = null;
                selectedOperation = '/';
                currentNum = 2;
                break;
        }
        currentNumField.textContent = num1;
        return;
    }
}

function inputNum() {
    if (currentNum == 1)   {
        if (num1 == null)   {
            if (this.textContent == '.')    { num1 = "0."; currentNumField.textContent = num1; return;}
            num1 = this.textContent;
        }
        else    { 
            if (this.textContent == '.' && num1.includes('.')) {
                return;
            }
            num1 = num1+""+this.textContent;
        }
        currentNumField.textContent = num1;
    }
    if (currentNum == 2)    {
        if (num2 == null)   {
            if (this.textContent == '.')    { num2 = "0."; currentNumField.textContent = num2; return;}
            num2 = this.textContent;
        }
        else    { 
            if (this.textContent == '.' && num2.includes('.')) {
                return;
            }
            num2 = num2+""+this.textContent; 
        }
        currentNumField.textContent = num2;
    }
    return;
}

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
    return finalNum;
}

function clear()    {
    num1 = null;
    num2 = null;
    currentNum = 1;
    currentNumField.textContent = "";
}
function del()  {
    if (currentNum == 1)    {
        num1 = num1+"";
        num1 = num1.slice(0, num1.length-1);
        currentNumField.textContent = num1;
    }
    if (currentNum == 2)    {
        num2 = num2.slice(0, num2.length-1);
        currentNumField.textContent = num2;
    }
    return;
}