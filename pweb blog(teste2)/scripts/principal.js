const apiUrl = "http://localhost:3000/usuarios";

document.documentElement.style.scrollBehavior = "smooth";

const botaoConhecerMais = document.querySelector(".bt1");
const botaoExplorarArtigos = document.querySelector(".bt2");

const secaoDestaques = document.querySelector(".posts");
const secaoArtigos = document.querySelector(".Artigos");

if (botaoConhecerMais && secaoDestaques) {
    botaoConhecerMais.addEventListener("click", () => {
        secaoDestaques.scrollIntoView({ behavior: "smooth" });
    });
}

if (botaoExplorarArtigos && secaoArtigos) {
    botaoExplorarArtigos.addEventListener("click", () => {
        secaoArtigos.scrollIntoView({ behavior: "smooth" });
    });
}

// ajustar o tempo de edição e postagem
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

// ajustar data
function formatarData(dataStr) {
    const meses = {
        jan:"jan", fev:"fev", mar:"mar", abr:"abr",
        mai:"mai", jun:"jun", jul:"jul", ago:"ago",
        set:"set", out:"out", nov:"nov", dez:"dez"
    };

    dataStr = dataStr.toLowerCase().replace(' de','').replace('.','');
    const [dia, mesAbrev] = dataStr.split(" ");
    return meses[mesAbrev] ? `${dia} ${meses[mesAbrev]}` : dataStr;
}

const fotos = {
    "2b6a": 'ahs.html',
    "b2db": 'blackmirror.html',
    "61db": 'bomdiaveronica.html',
    "f594": 'breakingbad.html',
    "550d": 'dexter.html',
    "8dac": 'killingeve.html',
    "a8c9": 'StrangerThings.html',
    "0628": 'thehauntingofblymanor.html',
    "5dc0": 'twd.html',
    "30d4": 'tlfou.html',
    "1189": 'tvd.html',
    "d2bc": 'yellowjackets.html',
    "6b11": 'you.html'
};

document.addEventListener("click", e => {
    const post = e.target.closest(".abrir-post");
    if (!post) return;

    const id = post.dataset.id;
    if (!id || !fotos[id]) return;

    window.location.href = `../pages/fotos/${fotos[id]}`;
});

// carregar posts do admin
window.addEventListener("DOMContentLoaded", carregarTudo);

function carregarTudo() {
    fetch(apiUrl)
        .then(res => res.json())
        .then(posts => {
            if (!posts.length) return;

            carregarDestaque(posts[0]);     
            carregarPopulares(posts.slice(1, 4));
            carregarArtigos(posts.slice(4));

            atualizarTempos();
        })
        .catch(err => console.error("Erro ao carregar posts:", err));
}

// fazer o "Destque" funcionar
function carregarDestaque(post) {
    const container = document.querySelector(".werych");
    if (!container) return;

    const dataFormatada = formatarData(post.data);
    const editado = Number(post.editadoEm) || Date.now();

    container.innerHTML = `
        <h1>Em destaque</h1>

        <img class="img1 abrir-post" data-id="${post.id}" src="${post.url}" alt="${post.titulo}">
        
        <div class="info1">
            <p class="cor1">${post.categoria}</p>
            <p>🗓️ ${dataFormatada} • ⏱︎ 
                <span data-editado="${editado}">${tempoDesde(editado)}</span>
            </p>
        </div>

        <h2 class="texto1">${post.mensagem}</h2>
    `;
}

// fazer o "Mais Populares" funcionar
function carregarPopulares(lista) {
    const container = document.querySelector(".tudo");
    if (!container) return;

    let html = `<section class="populares"><h2>Mais populares</h2></section>`;

    lista.forEach(post => {
        const dataFormatada = formatarData(post.data);
        const editado = Number(post.editadoEm) || Date.now();

        html += `
            <div class="org1 abrir-post" data-id="${post.id}">
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

// ajustar a barra de pesquisa
const barraPesquisa = document.querySelector(".pesq");

barraPesquisa.addEventListener("input", () => {
    const termo = barraPesquisa.value.toLowerCase();
    const posts = document.querySelectorAll(".cl .fotos .imagem");

    posts.forEach(post => {
        const categoria = post.querySelector(".v").textContent.toLowerCase();
        const mensagem = post.querySelector(".esp").textContent.toLowerCase();

        post.style.display =
            categoria.includes(termo) || mensagem.includes(termo)
                ? "block"
                : "none";
    });
});

// ajustar os "Artigos"
function carregarArtigos(posts) {
    const postsContainer = document.querySelector('.cl .fotos');
    postsContainer.innerHTML = '';

    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('imagem', 'abrir-post');
        postElement.dataset.id = post.id;

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

// atualizar tempo a cada 30s
setInterval(atualizarTempos, 30000);

// botão carregar mais
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

    btMais.style.display =
        maximo < postElements.length ? 'block' : 'none';
}