// let str = "";
// let btn = document.querySelectorAll('.btn');
// let btnl= document.querySelectorAll('.btn-left');
// Array.from(btn).forEach((btn)=>{
//     btn.addEventListener('click',(e)=>{
        
//          // Add a click event listener to the button element
// //  btn.addEventListener("click", function() {
//     // Increase the size of the button element by 20%
//     btn.style.width = "51px";
//     btn.style.height = "51px";
//     btn.style.backgroundColor = "red";
 
//     // Reset the size of the button element after 1 second
//     setTimeout(function() {
//       btn.style.width = "50px";
//       btn.style.height = "50px";
//       btn.style.backgroundColor= "#333333";
//       btnl.style.backgroundColor= "#FE9603";
//     }, 500);
// //   });
//         if(e.target.innerHTML == '='){
//             function tokenize(s) {
//                 // --- Parse a calculation string into an array of numbers and operators
//                 const r = [];
//                 let token = '';
//                 for (const character of s) {
//                     if ('^*/+-'.includes(character)) {
//                         if (token === '' && character === '-') {
//                             token = '-';
//                         } else {
//                             r.push(parseFloat(token), character);
//                             token = '';
//                         }
//                     } else {
//                         token += character;
//                     }
//                 }
//                 if (token !== '') {
//                     r.push(parseFloat(token));
//                 }
//                 return r;
//             }
            
//             function calculate(tokens) {
//                 // --- Perform a calculation expressed as an array of operators and numbers
//                 const operatorPrecedence = [{'^': (a, b) => Math.pow(a, b)},
//                            {'*': (a, b) => a * b, '/': (a, b) => a / b},
//                            {'+': (a, b) => a + b, '-': (a, b) => a - b}];
//                 let operator;
//                 for (const operators of operatorPrecedence) {
//                     const newTokens = [];
//                     for (const token of tokens) {
//                         if (token in operators) {
//                             operator = operators[token];
//                         } else if (operator) {
//                             newTokens[newTokens.length - 1] = 
//                                 operator(newTokens[newTokens.length - 1], token);
//                             operator = null;
//                         } else {
//                             newTokens.push(token);
//                         }
//                     }
//                     tokens = newTokens;
//                 }
//                 if (tokens.length > 1) {
//                     console.log('Error: unable to resolve calculation');
//                     return tokens;
//                 } else {
//                     return tokens[0];
//                 }
//             }
//             const userInput =  document.querySelector('.input');
//             document.querySelector('.input').value = calculate(tokenize(userInput.value));
//         }
//         else if(e.target.innerHTML == 'AC'){
//             str = "";
//             document.querySelector('.input').value = str;
//         }
//         else{
//             console.log(e.target);
//             str = str + e.target.innerHTML;
//             document.querySelector('.input').value = str;
//         }
        
//     })
// })
// Select the button element
const resultElement= document.getElementById('result');
const clearBtn= document.getElementById('clear-btn');
const deleteBtn= document.getElementById('delete-btn');
const divideBtn= document.getElementById('divide-btn');
const multiplyBtn= document.getElementById('multiply-btn');
const subtractBtn= document.getElementById('subtract-btn');
const addBtn= document.getElementById('add-btn');
const decimalBtn= document.getElementById('decimal-btn');
const equalBtn= document.getElementById('equal-btn');
const numberBtns= document.querySelectorAll('.number');
//Intialized the variables
let result = '';
let operation = '';
let previousOperand = 0;
//function to append number
const appendNumber = (number)=>{
    if(number === '.'&& result.includes('.')) return ;
    result += number ;
    updateDisplay();
    
}
const updateDisplay= ()=>{
    if(operation){
        resultElement.innerText = `${previousOperand} ${operation} ${result}`;
    }
    else{
        resultElement.innerText= result;
    }
    
}
//function to select operator
const selectOperator=(operatorValue)=>{
    if(result ==='') return;
    if(operation !== '' && previousOperand!== ''){
        calculateResult();
    }
    operation = operatorValue;
    previousOperand = result;
    result= ''; 
    updateDisplay();
}
// function to calculate result
const calculateResult=()=>{
    let evaluatedResult;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(result);
    if(isNaN(prev) || isNaN(current)) return;
    switch(operation){
        case '+':
            evaluatedResult = prev + current;
            break;
        case '-':
            evaluatedResult = prev - current;
            break;
        case '*':
            evaluatedResult = prev * current;
            break;
        case '/':
            evaluatedResult = prev /  current;
            break;
        default:
            return;

    }
    result = evaluatedResult.toString();
    operation = '';
    previousOperand = '';
}
//Add event listener to number buttons
numberBtns.forEach(btn =>{
    btn.addEventListener('click',()=>{
        // console.log(button.innerText);
        appendNumber(btn.innerText);
    })
})
const deleteLastDigit =()=>{
    if( result === '') return;
    result = result.slice(0,-1);
    updateDisplay();
}
decimalBtn.addEventListener('click',()=>{
    appendNumber('.');
})
divideBtn.addEventListener('click',()=>{
    selectOperator('/');
})
multiplyBtn.addEventListener('click',()=>{
    selectOperator('*');
})
subtractBtn.addEventListener('click',()=>{
    selectOperator('-');
})
addBtn.addEventListener('click',()=>{
    selectOperator('+');
})
equalBtn.addEventListener('click',()=>{
    // if(result === '') return;
    calculateResult();
    updateDisplay();
})
clearBtn.addEventListener('click',()=>{
    resultElement.innerText= 0;
    previousOperand = 0;
    result= ''; 
    operation = '';
})
deleteBtn.addEventListener('click',()=>{
   deleteLastDigit();
})