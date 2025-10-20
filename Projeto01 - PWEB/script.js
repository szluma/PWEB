const cumprimento = document.getElementById("saudacao");

const horas = new Date().getHours();
let hora;

if (horas >= 6 && horas <= 11) {
    hora = "Bom dia";
}
else if (horas >= 12 && horas <= 17) {
    hora = "Boa tarde";
}
else {
    hora = "Boa noite";
}

cumprimento.innerHTML = `${hora}, <b>Clara e Luma👋</b>`;

function adicionar_tarefa (){
    const tarefas = document.getElementById("add_tarefa");
    const meses = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];
}