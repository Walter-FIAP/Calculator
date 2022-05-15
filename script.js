const display = document.getElementById('display');
const buttons = document.querySelectorAll('[id*=tecla]');
const operators = document.querySelectorAll('[id*=operador]');

let newNumber = true;
let operator = "";
let previousNumber = "";
let currentNumber = "";    // Armazena o numero atual para operações com virgula

function updateDisplay(number) {
    if(newNumber) {
        currentNumber = number;
        display.textContent = currentNumber;
        newNumber = false;
    }
    else {
        currentNumber += number;
        display.textContent = currentNumber;
    }
}

const insertNumber = (event) => {
    updateDisplay(event.target.textContent);
}

// Prototype são atributos e funções inerentes ao tipo

buttons.forEach((button) => button.addEventListener('click', insertNumber));

const selectOperator = (event) => {
    newNumber = true;
    operator = event.target.textContent;
    previousNumber = display.textContent;
    currentNumber = "";
}

operators.forEach((operator) => operator.addEventListener('click', selectOperator));

const calculate = () => {
    if (operator == "") {
        console.log('Operador nao selecionado');
        return;  // Se operador
    }

    const actualNumber = currentNumber.replace("," , ".");      // Troca virgula (display) para ponto (calculo)
    const anteriorNumber = previousNumber.replace("," , ".");   // Troca virgula (display) para ponto (calculo)
    console.log('Anterior = ', anteriorNumber);
    console.log('Atual    = ', actualNumber);
    console.log('Operador = ', operator);      // Apresenta os resultados para verificacao de metodologia de calculo
    result = eval(`${anteriorNumber}${operator}${actualNumber}`); //template string, utilizando craze

    newNumber = true;
    operator = "";    // Apaga o operador nao permitindo novos calculos pressinando varias vezes o igual

    result = String(result);            // Converte o numero para string
    result = result.replace(".", ",");  // Troca ponto por virgula para mostrar numeros decimeis com virgula
    updateDisplay(result);
}

const equal = document.querySelector("#igual");

equal.addEventListener('click', calculate);

const clearDisplay = () => {
    currentNumber = "";
    display.textContent = currentNumber;
}

document.querySelector("#limparDisplay").addEventListener("click", clearDisplay);

const clearCalc = () => {
  clearDisplay();
  newNumber = true;
  operator = undefined;
  previousNumber = undefined;
};

document.querySelector("#limparCalculo").addEventListener("click", clearCalc);

const removeLastNumber = () => {
    currentNumber = currentNumber.slice(0,-1);
    display.textContent = currentNumber;
}

document.querySelector("#backspace").addEventListener("click", removeLastNumber);

const invertSignal = () => {
    newNumber = true;
    currentNumber = currentNumber * -1;
    updateDisplay(currentNumber);
}

const virgula = () => {
    posicaoVirgula = currentNumber.search(",");  // Nao faz nada se numero atual ja contem uma virdula
    if (posicaoVirgula == -1) {
        newNumber = true;
        if (currentNumber == '') {               // Se numero atual eh vazio, começar novo numero com "0,"
            currentNumber = "0,";
            updateDisplay(currentNumber);
        } else {
            currentNumber = currentNumber + ",";   // Coloca uma virgula a direita do numero
            updateDisplay(currentNumber);
        }
    }
}

document.querySelector("#inverter").addEventListener("click", invertSignal);

document.querySelector("#decimal").addEventListener("click", virgula);
