const prompt = require('prompt-sync')();

let data = Number(prompt("Digite um ano: "));

if (data % 4 == 0) {
    console.log(`O ano ${data}, é bissexto!`);
}  
else {
    console.log(`O ano ${data}, não é bissexto!`);  
} 