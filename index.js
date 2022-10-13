const display = document.querySelector('.display')
const deleteLast = document.querySelector('.backspace')
const plus = document.querySelector('.plus')
const minus = document.querySelector('.minus')
const multi = document.querySelector('.multi')
const divide = document.querySelector('.divide')
const egal = document.querySelector('.egal')
const numbers = document.querySelector('.numbers')
const clear = document.querySelector('.clear')
const message = document.querySelector('.message')
const dot = document.querySelector('.dot')
let operands = []

//clear
let clearDisplay = () => {
    display.textContent = '0';
}
const checkClear = clear.addEventListener('click', (e) => {
    clearDisplay()
})

const deleteLastC = deleteLast.addEventListener('click', (e) => {
    backSpace();
})

//numbers
//from keydown
const getKeyboardInput = window.addEventListener('keydown', (e) => {
    if (e.key === '-') {
        egalLogic()
        setDisplay('-')
    } else if (e.key === '+') {
        egalLogic()
        setDisplay('+')
    } else if (e.key === '*') {
        egalLogic()
        setDisplay('*')
    } else if (e.key === '/') {
        egalLogic()
        setDisplay('/')
    } else if (e.key === '.') {
        setDisplay('.')
    }
    else if (e.key === '=' || e.code === 'Space' || e.key === "Enter") {
        egalLogic()
    } else if (e.key === 'Backspace') {
        backSpace()
    } else if (isNaN(Number(e.key))) {
        return
    } else {
        setDisplay(e.key)
    }
})

// from click
const checkNumber = getNumbers().forEach(item => {
    item.addEventListener('click', (e) => {
        setDisplay(e.target.textContent)
    })
});

function getNumbers() {
    let numbersNodes = [];
    for (let i = 0; i < numbers.childNodes.length; i++) {
        numbersNodes.push(numbers.childNodes[i])
    }
    let x = numbersNodes.filter((item) => {
        return (item.className === 'number') ? true : false;
    })
    return x
}

//display
function setDisplay(input) {
    if (input === 'NaN') {
        clearDisplay()
        message.textContent = "Please enter a valid number!"
    } else if (input.toString().length >= 27 || display.textContent.length >= 27) {
        message.textContent = "TO MANY NUMBERS"
        clearDisplay()
    } else if (display.textContent === '0') {
        display.textContent = ''
        display.textContent += input;
    } else {
        display.textContent += input;

    }
}



//operators events
const plusClick = plus.addEventListener('click', (e) => {
    egalLogic()
    setDisplay('+')
})
const minusClick = minus.addEventListener('click', (e) => {
    egalLogic()
    setDisplay('-')
})
const multiClick = multi.addEventListener('click', (e) => {
    egalLogic()
    setDisplay('*')
})
const divideClick = divide.addEventListener('click', (e) => {
    egalLogic()
    setDisplay('/')
})

const dotClick = dot.addEventListener('click', (e) => {
    setDisplay('.')
})

const egalClick = egal.addEventListener('click', (e) => {
    egalLogic()
})

//make an array
function getOperands(input) {
    let x = []
    if (display.textContent.substring(0, 1) === '-') {
        x = display.textContent.substring(1).split(input)
        x[0] /= (-1)
        return x
    } else {
        return display.textContent.split(input)
    }
}

//logic
function sum(x, y) {
    return (Number.isInteger(x + y) ? (x + y) : (x + y).toFixed(2))
}

function sub(x, y) {
    return (Number.isInteger(x - y) ? (x - y) : (x - y).toFixed(2))
}

function div(x, y) {
    if (y === 0) {
        clearDisplay()
        return `${x} / ${y} = <a style="color: white;" href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">this</a>`
    }
    return (Number.isInteger(x / y) ? (x / y) : (x / y).toFixed(2))
}

function mul(x, y) {
    return (Number.isInteger(x * y) ? (x * y) : (x * y).toFixed(2))
}

function egalLogic() {
    if (display.textContent.includes('/')) {
        operands = getOperands('/')
        clearDisplay()
        let result = div(Number(operands[0]), Number(operands[1]))
        if (result.length > 28) {
            message.innerHTML = result
        } else {
            message.textContent = `${operands[0]} / ${operands[1]} = ${result}`
            setDisplay(result)
        }
    } else if (display.textContent.includes('*')) {
        operands = getOperands('*')
        clearDisplay()
        let result = mul(Number(operands[0]), Number(operands[1]))
        message.textContent = `${operands[0]} * ${operands[1]} = ${result}`
        setDisplay(result)
    } else if (display.textContent.includes('+')) {
        operands = getOperands('+')
        clearDisplay()
        let result = sum(Number(operands[0]), Number(operands[1]))
        message.textContent = `${operands[0]} + ${operands[1]} = ${result}`
        setDisplay(result)
    } else if (display.textContent.substring(1).includes('-')) {
        operands = getOperands('-')
        clearDisplay()
        let result = sub(Number(operands[0]), Number(operands[1]))
        message.textContent = `${operands[0]} - ${operands[1]} = ${result}`
        setDisplay(result)
    }
}

function backSpace() {
    display.textContent = display.textContent.substring(0, display.textContent.length - 1)
}