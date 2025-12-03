const API_URL = "http://localhost:3000/usuarios";

const container = document.querySelector(".fotos");
let limite = 3;

async function carregarPosts() {
    const resposta = await fetch(API_URL);
    const dados = await resposta.json();

    // APAGA O HTML FIXO
    container.innerHTML = "";

    dados.slice(0, limite).forEach(post => {
        const div = document.createElement("div");
        div.classList.add("imagem");

        div.innerHTML = `
            <img src="${post.url}" class="i">
            <p class="v">${post.categoria}</p>
            <p class="esp">${post.titulo}</p>
            <p class="esp">🗓️ ${post.data} • ⏱︎ ${post.tempo}</p>
        `;

        container.appendChild(div);
    });
}

document.getElementById("maisPosts").addEventListener("click", () => {
    limite += 3;
    carregarPosts();
});


// carrega ao abrir o site
carregarPosts();
