window.onload = () => {
    window.confirm('Atenção!!! \n1-O Nome Completo deve conter apenas Letras( começar com maiúscula e as seguintes minúscula) \n2-A senha deve conter apenas números(mínimo 4 e máximo 8) \n3-Defina uma data Válida(+12) \n4-Escolha um Email Válido')
}
const patterns = {
        name: /^[A-Z][a-z][^ |0-9|\W| ]{0,15}$/,
        pass: /^[^ |a-z|A-z|\W| ]{4,8}$/,
        email: /^[a-z][^ ]+@[^ ]+\.[a-z]{2,3}$/,
    }

let Fname = document.querySelector('#FirstName')
let Lname = document.querySelector('#LastName')
let pass1 = document.querySelector('#Password1')
let pass2 = document.querySelector('#Password2')
let validated = [7,7,7,7];

// Validação dos campos            
validation = input => {
    empty = (index) => {document.querySelectorAll('.field')[index].style.color = '#45f3ff'}
    valid = (index) => {document.querySelectorAll('.field')[index].style.color = '#00ff00'}
    invalid = (index) => {document.querySelectorAll('.field')[index].style.color = '#ff0000'}
    
    if(input.type == 'text'){
        if(input.id === 'FirstName' || input.id === 'LastName'){
            FloatingEffect(input)
            if(input.id === 'FirstName' && input.value != ''){   
                ( input.value.match(patterns.name) && input.value != '' ?  valid(0) : invalid(0) )
            } else if (input.id === 'FirstName' && input.value == ''){ empty(0) }
            if(input.id === 'LastName' && input.value != ''){
                ( input.value.match(patterns.name) && input.value != '' ?  valid(1) : invalid(1) )
            } else if (input.id === 'LastName' && input.value == ''){ empty(1) }
            if(Fname.value == "" && Lname.value == ""){
                validated[0] = 7  
            } else {
                ( Fname.value.match(patterns.name) && Lname.value.match(patterns.name) && (Fname.value !== '' && Lname.value !== '')  ) ? validated[0]=1 : validated[0] = 0
            }
        }
        if (input.id === 'Email') {
            if(input.value == ""){ validated[3] = 7 ; empty(5)
            } else {
                (input.value.match(patterns.email)) ? validated[3]=1 : validated[3] = 0
                if(validated[3] === 0){ invalid(5) }
                if(validated[3] === 1){ valid(5) }
            }
        }
    } 
    
    if(input.type == 'password'){
        if(input.id === 'Password1' || input.id === 'Password2'){
            FloatingEffect(input)
            if(input.id === 'Password1' && input.value != '' ){   
                ( input.value.match(patterns.pass) && input.value != '' ?  valid(2) : invalid(2) )
            } else if (input.id === 'Password1' && input.value == ''){ empty(2) }
            if(input.id === 'Password2' && input.value != ''){
                ( input.value.match(patterns.pass) && input.value != '' ?  valid(3) : invalid(3) )
            } else  if (input.id === 'Password2' && input.value == ''){ empty(3) }
            if(pass1.value == "" && pass2.value == ""){
                validated[1] = 7
            } else {
                (input.value.match(patterns.pass) && input.value !== '' && (pass1.value === pass2.value)) ? validated[1]=1 :  validated[1] = 0
                if( (input.value.match(patterns.pass) && validated[1] === 0 && (pass1.value.length >=4 && pass2.value.length >=4)) || 
                (!(input.value.match(patterns.pass)) && validated[1] === 0 && (pass1.value.length >=4 && pass2.value.length >=4)) ){ invalid(2) ; invalid(3) } 
                if( validated[1] === 1) { valid(2) ; valid(3) }
            }
        }
    }
    
    if(input.type == 'date'){
        const actualYear = new Date().getFullYear()
        let getYear = Number(document.querySelector('#Date').value.slice(0,4))
        if(input.value == ""){
            validated[2] = 7
            empty(4)
        } else {
            ((actualYear - getYear >= 12)  && (actualYear - getYear <= 183)) ? validated[2]=1 : validated[2] = 0
            if (validated[2]===1) { valid(4) }
            if (validated[2]===0) { invalid(4) }
        }
    }
}

// Efeito dos campos de nome/sobrenome e senha/confirmar senha
FloatingEffect = inputType =>{
    function enable(x){
        setTimeout(() => {
            NamesOrPasswords[x].querySelector('.FloatingEffect').style.removeProperty('left')
            NamesOrPasswords[x].querySelector('.FloatingEffect').style.setProperty('left','50%')
        }, 450);
    }
            
    function disable(x){
        setTimeout(() => {
            NamesOrPasswords[x].children[0].style.width = ''
            NamesOrPasswords[x].querySelector('.FloatingEffect').style.removeProperty('display')
        }, 450);
    } 
    
    NamesOrPasswords = document.querySelectorAll('.DoubleField')
    if(inputType.type == 'text'){
        textLabel = document.querySelectorAll('.text')[0]
        if (Fname.value == '' && Lname.value == ''){
            textLabel.textContent = 'Nome Completo'
            NamesOrPasswords[0].querySelector('.FloatingEffect').style.removeProperty('left')
            NamesOrPasswords[0].querySelector('.FloatingEffect').style.setProperty('left','0%')
            disable(0)
            
        } 
        if (Fname.value != ''  &&  validated[0] !== 0 && validated[0] !== 1) {
            textLabel.textContent = 'Nome'
            NamesOrPasswords[0].children[0].style.width = '50%'
            NamesOrPasswords[0].querySelector('.FloatingEffect').style.setProperty('display', 'block')
            enable(0)
        }
    } else {
        if (pass1.value == '' && pass2.value == ''){
            NamesOrPasswords[1].querySelector('.FloatingEffect').style.removeProperty('left')
            NamesOrPasswords[1].querySelector('.FloatingEffect').style.setProperty('left','0%')
            disable(1)
        } 
        if (pass1.value != ''  &&  validated[1] !== 0 && validated[1] !== 1) {
            NamesOrPasswords[1].children[0].style.width = '50%'
            NamesOrPasswords[1].querySelector('.FloatingEffect').style.setProperty('display', 'block')
            enable(1)
        }
    }   
}

// Efeito do Botão SEND
ColorEffect = () =>{
    if (validated[0] === 0 || validated[1] === 0 || validated[2] === 0 || validated[3] === 0) { color = '#ff0000' }
    if ((validated[0] + validated[1] + validated[2] + validated[3]) === 4) { color = '#00ff00' }
    if ((validated[0] * validated[1] * validated[2] * validated[3]) > 4) { color = '#45f3ff' }

    span = document.querySelectorAll('.ButtonEffect .lines span')
    button = document.querySelector('#SubmitInput')
 
    for(let x = 0; x < span.length; x++){ span[x].style.background = color }
 
    button.style.color = color
}

// Verificação dos campos
Submit = () =>{
    ColorEffect()
    if((validated[0] + validated[1] + validated[2] + validated[3] ) === 4){
        document.querySelector('input#SubmitInput').removeAttribute('type')
        document.querySelector('input#SubmitInput').setAttribute('type', 'submit')
        nome =Fname.value +' '+ Lname.value
        const getDados = {
            nome,
            senha: pass1.value,
            data: document.querySelector('#Date').value,
            email: document.querySelector('#Email').value
        }
        localStorage.setItem('Dados', JSON.stringify(getDados))
    } else if ((validated[0] + validated[1] + validated[2] + validated[3] ) !== 4){
        document.querySelector('input#SubmitInput').removeAttribute('type')
        document.querySelector('input#SubmitInput').setAttribute('type', 'button') 
    }
}