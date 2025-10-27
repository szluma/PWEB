const horas = new Date().getHours();
const cumprimento = document.getElementById("saudacao");
let hora;

if (horas >= 6 && horas <= 11) {
    hora = "Bom dia";
} else if (horas >= 12 && horas <= 17) {
    hora = "Boa tarde";
} else {
    hora = "Boa noite";
}

cumprimento.innerHTML = `${hora} <b>Clara e Luma 👋</b>`;

const formulario = document.getElementById("container_1");
const inputTarefa = document.getElementById("add_tarefa");
const divConcluidas = document.getElementById("concluidas");
const divUltima = document.querySelector(".ult_div");

let tarefas = [];

formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    const texto = inputTarefa.value.trim();
    if (!texto) {
        alert("Digite o nome da tarefa!");
        return;
    }

    const dataAtual = new Date();
    const meses = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
    const dia = dataAtual.getDate();
    const mes = meses[dataAtual.getMonth()];
    const ano = dataAtual.getFullYear();
    const dataFormatada = `${dia} de ${mes} de ${ano}`;

    tarefas.push({ nome: texto, concluida: false, data: dataFormatada });
    inputTarefa.value = "";
    mostrarTarefas();
});

function mostrarTarefas() {
    const antigas = document.querySelectorAll(".tarefa-item");
    antigas.forEach(t => t.remove());

    if (tarefas.length === 0) {
        divUltima.style.display = "flex";
        divConcluidas.innerHTML = "";
        return;
    } else {
        divUltima.style.display = "none";
    }

    tarefas.forEach((tarefa, index) => {
        const divTarefa = document.createElement("div");
        divTarefa.className = "tarefa-item";

        const divInfo = document.createElement("div");
        divInfo.className = "tarefa-info";

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = tarefa.concluida;

        const textoDiv = document.createElement("div");

        const span = document.createElement("span");
        span.textContent = tarefa.nome;
        if (tarefa.concluida) {
            span.classList.add("concluida");
        }

        const data = document.createElement("p");
        data.innerHTML = tarefa.concluida
            ? `Concluída em: ${tarefa.data}`
            : `Criada em: ${tarefa.data}`;
        data.className = "data-tarefa";

        textoDiv.appendChild(span);
        textoDiv.appendChild(data);

        const botao = document.createElement("button");
        botao.textContent = "✖";
        botao.className = "btn-delete";

        divInfo.appendChild(checkbox);
        divInfo.appendChild(textoDiv);

        divTarefa.appendChild(divInfo);
        divTarefa.appendChild(botao);

        if (tarefa.concluida) {
            divTarefa.classList.add("verde");
        }

        divUltima.parentNode.insertBefore(divTarefa, divUltima);

        checkbox.addEventListener("change", () => {
            tarefa.concluida = checkbox.checked;
            if (tarefa.concluida) {
                span.classList.add("concluida");
                data.textContent = `Concluída em: ${tarefa.data}`;
                divTarefa.classList.add("verde");
            } else {
                span.classList.remove("concluida");
                data.textContent = `Criada em: ${tarefa.data}`;
                divTarefa.classList.remove("verde");
            }
            atualizarContador();
        });

        botao.addEventListener("click", () => {
            tarefas.splice(index, 1);
            mostrarTarefas();
        });
    });

    atualizarContador();
}

function atualizarContador() {
    const concluidas = tarefas.filter(t => t.concluida).length;
    divConcluidas.innerHTML = `${concluidas} de ${tarefas.length} <strong class="verdinho">concluídas</strong>`;
}

mostrarTarefas();