const prompt = require('prompt-sync')();
const temperatura = prompt("Qual é a temperatura?");
const escala = prompt("Qual é a escala?");

    if(escala === "C"){
       let  ConversaoCF = (`${temperatura * (9/5)}`) + 32;
        console.log("A temperatura é: ", ConversaoCF);
    }
    else {
        let ConversaoCF = (`${temperatura - 32}`) * 5/9;
        console.log("A temperatura é: ", ConversaoCF);
    }