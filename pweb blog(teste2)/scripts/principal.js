const apiUrl = "http://localhost:3000/usuarios";

// ==================== FUNÇÃO TEMPO ====================
function tempoDesde(valor) {
    const timestamp = Number(valor);
    if (!timestamp) return "editado agora";

    const diferenca = Date.now() - timestamp;

    const s = Math.floor(diferenca / 1000);
    if (s < 60) return `editado há ${s}s`;

    const m = Math.floor(s / 60);
    if (m < 60) return `editado há ${m} minutos`;

    const h = Math.floor(m / 60);
    if (h < 24) return `editado há ${h} horas`;

    const d = Math.floor(h / 24);
    return `editado há ${d} dias`;
}

function atualizarTempos() {
    document.querySelectorAll("[data-editado]").forEach(el => {
        el.textContent = tempoDesde(el.dataset.editado);
    });
}

// ==================== FORMATAR DATA ====================
function formatarData(dataStr) {
    const meses = {
        "jan":"jan","fev":"fev","mar":"mar","abr":"abr",
        "mai":"mai","jun":"jun","jul":"jul","ago":"ago",
        "set":"set","out":"out","nov":"nov","dez":"dez"
    };

    dataStr = dataStr.toLowerCase().replace(' de','').replace('.','');
    const [dia, mesAbrev] = dataStr.split(" ");
    return meses[mesAbrev] ? `${dia} ${meses[mesAbrev]}` : dataStr;
}

// ==================== CARREGAR POSTS ====================
window.addEventListener("DOMContentLoaded", carregarTudo);

function carregarTudo() {
    fetch(apiUrl)
        .then(res => res.json())
        .then(posts => {
            if (!posts.length) return;

            carregarDestaque(posts[0]);       // ⭐ primeiro post
            carregarPopulares(posts.slice(1, 4)); // ⭐ próximos 3
            carregarArtigos(posts);           // ⭐ já tinha essa seção

            atualizarTempos();
        })
        .catch(err => console.error("Erro ao carregar posts:", err));
}

// ==================== SEÇÃO: EM DESTAQUE ====================
function carregarDestaque(post) {
    const container = document.querySelector(".werych");

    if (!container) return;

    const dataFormatada = formatarData(post.data);
    const editado = Number(post.editadoEm) || Date.now();

    container.innerHTML = `
        <h1>Em destaque</h1>

        <img class="img1" src="${post.url}" alt="${post.titulo}">
        
        <div class="info1">
            <p class="cor1">${post.categoria}</p>
            <p>🗓️ ${dataFormatada} • ⏱︎ <span data-editado="${editado}">
                ${tempoDesde(editado)}
            </span></p>
        </div>

        <h2 class="texto1">${post.mensagem}</h2>
    `;
}

// ==================== SEÇÃO: MAIS POPULARES ====================
function carregarPopulares(lista) {
    const container = document.querySelector(".tudo");

    if (!container) return;

    let html = `<section class="populares"><h2>Mais populares</h2></section>`;

    lista.forEach(post => {
        const dataFormatada = formatarData(post.data);
        const editado = Number(post.editadoEm) || Date.now();

        html += `
            <div class="org1">
                <img class="img234" src="${post.url}" alt="">
                <div class="info">
                    <p>${post.categoria}</p>
                    <p class="espacamento1">${post.mensagem}</p>
                    <p class="espacamento1">
                        🗓️ ${dataFormatada} • ⏱︎ 
                        <span data-editado="${editado}">${tempoDesde(editado)}</span>
                    </p>
                </div>
            </div>
            <hr class="linha">
        `;
    });

    container.innerHTML = html;
}

// =========================== PESQUISA ===========================
const barraPesquisa = document.querySelector(".pesq");

barraPesquisa.addEventListener("input", () => {
    const termo = barraPesquisa.value.toLowerCase();

    const posts = document.querySelectorAll(".cl .fotos .imagem");

    posts.forEach(post => {
        const categoria = post.querySelector(".v").textContent.toLowerCase();
        const mensagem = post.querySelector(".esp").textContent.toLowerCase();

        if (categoria.includes(termo) || mensagem.includes(termo)) {
            post.style.display = "block";
        } else {
            post.style.display = "none";
        }
    });
});


// ==================== SEÇÃO: ARTIGOS ====================
function carregarArtigos(posts) {
    const postsContainer = document.querySelector('.cl .fotos');
    postsContainer.innerHTML = '';

    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('imagem');

        const dataFormatada = formatarData(post.data);
        const valorEditado = Number(post.editadoEm) || Date.now();

        postElement.innerHTML = `
            <img src="${post.url}" alt="${post.titulo}" class="i">
            <p class="v">${post.categoria}</p>
            <p class="esp">${post.mensagem}</p>

            <p class="esp">
                🗓️ ${dataFormatada} • 
                ⏱︎ <span data-editado="${valorEditado}">${tempoDesde(valorEditado)}</span>
            </p>
        `;

        postsContainer.appendChild(postElement);
    });

    MaximoPosts(posts);
}

// ==================== BOTÃO "CARREGAR MAIS" ====================
const btMais = document.getElementById("mais");
let maximo = 6;

btMais.addEventListener("click", () => {
    maximo += 6;
    carregarTudo();
});

function MaximoPosts(posts) {
    const postsContainer = document.querySelector('.cl .fotos');
    const postElements = postsContainer.querySelectorAll('.imagem');

    postElements.forEach((post, index) => {
        post.style.display = index < maximo ? 'block' : 'none';
    });

    btMais.style.display = maximo < postElements.length ? 'block' : 'none';
}

// Atualiza tempo automaticamente
setInterval(atualizarTempos, 30000);
