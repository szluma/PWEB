const prompt = require('prompt-sync')();
const idade = prompt("Digite sua idade: ");

console.log(`Você tem ${idade} anos.`);

if (idade > 0 && idade <=12 ) {
    console.log("Criança");
} else if (idade >= 13 && idade <=17) {
    console.log("Adolescente");
}   else if (idade >= 18 && idade <= 59) {
    console.log("Adulto"); 
} else {
    console.log("Idoso");
}