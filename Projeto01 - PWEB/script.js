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

// function adicionar_tarefa (){
//     const tarefas = document.getElementById("add_tarefa");
//     const meses = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];
// }

const form = document.getElementById("container_1");
const verificado = document.getElementsByClassName("verificado");
const tarefas = [];

let ult_div = document.getElementById("ult_div");
let copia_ult_div = ult_div;

form.addEventListener("submit", function(CL){
    CL.preventDefault();

    let nome = document.getElementById("add_tarefa").value;
    const meses = ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"];
    const data_tarefa = `${horas.getDate()} de ${meses[horas.getMonth() - 1]} ${horas.getFullYear()}`;
    const situacao = false;

    const tarefa = {
        "nome": nome,
        "data": data_tarefa,
        "done": situacao 
    };

    tarefas.push(tarefa);
    if(ult_div){
        copia_ult_div.remove();
    }

    const tarefa_concluida = tarefas.filter(tarefa => tarefa.done === true). length;
    let concluidas = document.getElementById("concluidas");

    if(concluidas){
        concluidas.innerHTML = `<h4>${tarefa_concluida} de ${tarefas.length} <b>concluídas</b>`;
    }
    else {
        let concluidasEl = document.createElement("div");
        concluidasEl.setAttribute("id", "concluidas");
        document.getElementById("tarefasConcluidas").append(concluidasEl);
        concluidasEl.innerHTML = `<h4>${tarefa_concluida} de ${tarefas.length} <b>concluídas</b>`;
    }


});
