const prompt = require('prompt-sync')();

let nota = Number(prompt("Digite a sua nota: "))

switch(nota) {
    case 1 = (9 || 10):
    console.log("Sua classificação é A!");
    break;
    case 2 = (7 || 8):
    console.log("Sua classificação é B!");
    break;
    case 3 = (5 || 6):
    console.log("Sua classificação é C!");
    break;
    case 4 = (3 || 4):
    console.log("Sua classificação é D!");
    break;
    case 5 = (0 ||  1 || 2):
    console.log("Sua classificação é F!");
    break;
    default: 
    console.log("Nota não válida!")
}