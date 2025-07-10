function add(a,b){return round10(a+b);}
function substract(a,b){return round10(a-b);}
function multiply(a,b){return round10(a*b);}
function divide(a,b){if (b === 0){return "ERROR_DIVIDE_ZERO";}return round10(a/b);}
function round10(num) {
    // Convert the number to a string to determine integer part length
    const numString = String(num);
    const decimalIndex = numString.indexOf('.');
    let integerPartLength = decimalIndex === -1 ? numString.length : decimalIndex;

    // Calculate the number of decimal places needed to reach a total of 10 digits
    let decimalPlaces = Math.max(0, 10 - integerPartLength);

    // Round using toFixed and convert back to a number
    return parseFloat(num.toFixed(decimalPlaces));
}

function operate(operator, num1, num2){
    if (operator === '+'){
        return add(num1,num2)
    } else if (operator == '-'){
        return substract(num1,num2)
    }else if (operator == '*'){
        return multiply(num1,num2)
    }else if (operator == '/'){
        return divide(num1,num2)
    } else {
        return "ERROR_OPERATOR"
    }
}

math_aux = "";
function handleNumbers(e){
    let screen = document.querySelector("div .text");
    let screen_aux = document.querySelector("div .subtext");
    let math_aux = document.querySelector("div .icon");
    let data = e.target.textContent;
    if ("1234567890".includes(data)){
        if (screen.textContent.length < 9){
            screen.textContent += data;
        }
    } else if (".".includes(data)){
        if (!screen.textContent.includes(data)){
            screen.textContent += data;
        }
    } else if ("AC".includes(data)){
        screen.textContent = "";
        screen_aux.textContent ="";
        math_aux.textContent ="";
    } else if ("DEL".includes(data)){
        screen.textContent = screen.textContent.slice(0, -1);
    }else if ("+-/*=".includes(data)){
        if ((screen.textContent) || (screen_aux.textContent && !screen.textContent)){
            if ((math_aux.textContent == "")){
                if ((!screen_aux.textContent) || (screen_aux.textContent && screen.textContent)){
                    screen_aux.textContent =screen.textContent;
                    screen.textContent = "";    
                }
                math_aux.textContent = data;
                
            } else{
                if ("=".includes(data)){
                    if (!screen.textContent == ""){
                        screen.textContent = operate(math_aux.textContent,Number(screen_aux.textContent),Number(screen.textContent))
                        math_aux.textContent = "";
                        screen_aux.textContent = screen.textContent;
                        screen.textContent = "";
                    }
                    
                } else{
                    screen.textContent = operate(math_aux.textContent,Number(screen_aux.textContent),Number(screen.textContent))
                    math_aux.textContent = data;
                    screen_aux.textContent = screen.textContent
                    screen.textContent = "";
                }
            }
            }
    }
}

numbers = document.querySelector("div .buttons");
numbers.addEventListener("click", handleNumbers);