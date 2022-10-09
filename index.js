const display = document.querySelector('.display')
const opretors = document.querySelector('.operators')
//last line


let currentNumber = 0;
let lastNumber = 0;

const setDisplay = window.addEventListener('keydown', (e) => {
    if (isNaN(Number(e.key))) {
        console.log('NaN')
    } else {
        if (display.textContent === '0') {
            display.textContent = ''
            display.textContent += e.key;
            currentNumber = Number(display.textContent)
        } else {
            console.log(Number(e.key))
            display.textContent += e.key;
            currentNumber = Number(display.textContent)
        }
    }
})



function sum(x, y) {
    return x + y
}

function sub(x, y) {
    return x - y
}

function div(x, y) {
    return x / y
}

function mul(x, y) {
    return x * y
}

function operate(operator, x, y) {
    if (operator === '+') {
        sum(x, y)
    }
    if (operator === '-') {
        sub(x, y)
    }
    if (operator === '/') {
        div(x, y)
    }
    if (operator === '*') {
        mul(x, y)
    }
}