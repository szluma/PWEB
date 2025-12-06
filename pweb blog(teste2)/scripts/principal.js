const apiUrl = "http://localhost:3000/usuarios"; 

// Função de tempo desde a edição
function tempoDesde(timestamp) {

    const agora = Date.now();
    const diferenca = agora - Number(timestamp);

    if (diferenca < 0) return "editado agora";

    const segundos = Math.floor(diferenca / 1000);
    if (segundos < 60) return `editado há ${segundos} segundos`;

    const minutos = Math.floor(segundos / 60);
    if (minutos < 60) return `editado há ${minutos} minutos`;

    const horas = Math.floor(minutos / 60);
    if (horas < 24) return `editado há ${horas} horas`;

    const dias = Math.floor(horas / 24);
    return `editado há ${dias} dias`;
}

// Atualiza todas as tags com data-editado
function atualizarTempos() {
    const elementos = document.querySelectorAll("[data-editado]");
    elementos.forEach(el => {
        const timestamp = el.dataset.editado;
        el.textContent = tempoDesde(timestamp);
    });
}

// Função para controlar a quantidade de posts exibidos
function MaximoPosts(posts) {
    const postsContainer = document.querySelector('.cl .fotos');
    const postElements = postsContainer.querySelectorAll('.imagem');

    postElements.forEach((post, index) => {
        post.style.display = index < maximo ? 'block' : 'none';
    });

    btMais.style.display = maximo < postElements.length ? 'block' : 'none';
}

// Carregar posts quando a página for carregada
window.addEventListener('DOMContentLoaded', () => {
    carregarPosts();
});

// Variáveis de controle
const btMais = document.getElementById("mais");
let maximo = 6;

// Botão "Carregar mais"
btMais.addEventListener("click", () => {
    maximo += 6;
    carregarPosts();
});

// Formatar data
function formatarData(dataStr) {
    const meses = {
        "jan": "jan","fev": "fev","mar": "mar","abr": "abr",
        "mai": "mai","jun": "jun","jul": "jul","ago": "ago",
        "set": "set","out": "out","nov": "nov","dez": "dez"
    };

    dataStr = dataStr.toLowerCase().replace(' de', '').replace('.', '');
    const [dia, mesAbrev] = dataStr.split(" ");

    return meses[mesAbrev] ? `${dia} ${meses[mesAbrev]}` : null;
}

// Carregar posts
function carregarPosts() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(posts => {
            const postsContainer = document.querySelector('.cl .fotos');
            postsContainer.innerHTML = '';

            posts.forEach(post => {
                const postElement = document.createElement('div');
                postElement.classList.add('imagem');

                const dataPost = formatarData(post.data);
                const dataFormatada = dataPost ? dataPost : 'Data inválida';

                postElement.innerHTML = `
                    <img src="${post.url}" alt="${post.titulo}" class="i">
                    <p class="v">${post.categoria}</p>
                    <p class="esp">${post.mensagem}</p>

                    <p class="esp">
                        🗓️ ${dataFormatada} • 
                        ⏱︎ <span data-editado="${post.editado}"></span>
                    </p>
                `;

                postsContainer.appendChild(postElement);
            });

            MaximoPosts(posts);
            atualizarTempos(); // Atualiza o tempo logo após carregar
        })
        .catch(error => console.error('Erro:', error));
}

// Atualizar automaticamente a cada 30s
setInterval(atualizarTempos, 30000);
