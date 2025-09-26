const prompt = require('prompt-sync')();

let Numeros = Number(prompt("Digite um número:"));

if(Numeros % 2 == 0 ){
    console.log("O número é par!")
}
else{
    console.log("O número é ímpar!");
}