const nota1 = 10;
const nota2 = 10;

let Media = (nota1 + nota2) / 2;
    console.log(`${Media} é a média do aluno`);

if(Media >= 6){
    console.log("Aprovado!");
}

if (Media >= 4 && Media <= 5.9) {
    console.log("Recuperação!")
} 
if(Media < 4) {
    console.log("Reprovado!")
}