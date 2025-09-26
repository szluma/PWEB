const prompt = require('prompt-sync')();

console.log("Digite três números: ");
let numero1 = Number(prompt("Primeiro número: "));
let numero2 = Number(prompt("Segundo número: "));
let numero3 = Number(prompt("Terceiro número: "));

if (numero1 > numero2 && numero1 > numero3) {
    console.log(`O ${numero1} é o maior `);
} 
else if (numero2 > numero1 && numero2 > numero3 ) {
    console.log(`O ${numero2} é o maior `);
} 
else {
    console.log(`O ${numero3} é o maior `)
}