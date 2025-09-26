const prompt = require('prompt-sync')();

let cliente = prompt("Você é estudante, apostentado ou regular? ");

switch(cliente) {
    case "estudante":
        console.log("Desconto 50%");
        break;
    case "aposentado":
        console.log("Desconto 30%");
        break;
    case "regular":
        console.log("Você não tem desconto!");
        break;
}