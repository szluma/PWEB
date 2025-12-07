const apiUrl = "http://localhost:3000/usuarios";

document.documentElement.style.scrollBehavior = "smooth";

const params = new URLSearchParams(window.location.search);
const postIdAtual = params.get("id");

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

// ajustar o tempo de ediçao
function tempoDesde(timestamp) {
    const agora = Date.now();
    const diff = agora - Number(timestamp);

    if (diff < 0) return "editado agora";

    const seg = Math.floor(diff / 1000);
    if (seg < 60) return `editado há ${seg} segundos`;

    const min = Math.floor(seg / 60);
    if (min < 60) return `editado há ${min} minutos`;

    const h = Math.floor(min / 60);
    if (h < 24) return `editado há ${h} horas`;

    const d = Math.floor(h / 24);
    return `editado há ${d} dias`;
}

// carregar post atual
async function carregarPost() {
    try {
        const req = await fetch(apiUrl);
        const posts = await req.json();

        const post = posts.find(p => p.id == postIdAtual);
        if (!post) return;

        document.querySelector(".capa-post").src = post.url;
        document.querySelector(".titulo-post").textContent = post.titulo;
        document.querySelector(".data-post").textContent =
            `${post.data} • ${tempoDesde(post.editadoEm)}`;
        document.querySelector(".conteudo-post").innerHTML = post.mensagem;

    } catch (e) {
        console.log("Erro ao carregar post:", e);
    }
}

carregarPost();

// carregar semelhantes
async function carregarSemelhantes() {
    const container = document.querySelector(".semelhantes .cards");
    if (!container) return;

    container.innerHTML = "";

    try {
        const req = await fetch(apiUrl);
        const posts = await req.json();

        const outros = posts.filter(p => p.id != postIdAtual);

        for (let i = outros.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [outros[i], outros[j]] = [outros[j], outros[i]];
        }

        const relacionados = outros.slice(0, 3);

        relacionados.forEach(post => {
            const card = document.createElement("div");
            card.classList.add("card");

            card.innerHTML = `
                <img src="${post.url}" alt="">
                <p class="tag">${post.categoria}</p>
                <h5>${post.titulo}</h5>
                <p class="info">🗓️ ${post.data} • ${tempoDesde(post.editadoEm)}</p>
            `;

            card.addEventListener("click", () => {
                const pagina = fotos[post.id];  
                if (!pagina) return alert("Página não encontrada para este post.");
                window.location.href = `${pagina}?id=${post.id}`;
            });
            
            container.appendChild(card);
        });

    } catch (e) {
        console.log("Erro ao carregar semelhantes:", e);
    }
}

carregarSemelhantes();