const apiUrl = "http://localhost:3000/usuarios"; // Substitua pelo endpoint correto da sua API

// Função para controlar a quantidade de posts exibidos
function MaximoPosts(posts) {
    const postsContainer = document.querySelector('.cl .fotos');
    
    // Obtém todas as imagens (posts)
    const postElements = postsContainer.querySelectorAll('.imagem');

    // Controla a quantidade máxima de posts exibidos
    postElements.forEach((post, index) => {
        if (index < maximo) {
            post.style.display = 'block';
        } else {
            post.style.display = 'none';
        }
    });

    // Se ainda tem posts escondidos, mostra o botão "Carregar mais"
    if (maximo < postElements.length) {
        btMais.style.display = 'block';
    } else {
        btMais.style.display = 'none';
    }
}

// Carregar posts quando a página for carregada
window.addEventListener('DOMContentLoaded', () => {
    carregarPosts();  // Chama a função para carregar os posts
});

// Variáveis de controle de visualização
const btMais = document.getElementById("mais"); // Certifique-se que o botão #mais exista no HTML
let maximo = 6; // Começa com 6 posts visíveis

// Event listener para o botão "Carregar mais"
btMais.addEventListener("click", () => {
    maximo += 6;  // Adiciona 6 posts a cada clique
    carregarPosts();  // Carrega mais posts da API
});

function formatarData(dataStr) {
    // Definir os meses para conversão (com a versão abreviada de 3 letras)
    const meses = {
        "jan": "jan",
        "fev": "fev",
        "mar": "mar",
        "abr": "abr",
        "mai": "mai",
        "jun": "jun",
        "jul": "jul",
        "ago": "ago",
        "set": "set",
        "out": "out",
        "nov": "nov",
        "dez": "dez"
    };

    // Limpa o "de" e o ponto final no mês
    dataStr = dataStr.toLowerCase().replace(' de', '').replace('.', '');

    const [dia, mesAbrev] = dataStr.split(" ");

    if (meses[mesAbrev] !== undefined) {
        const mes = meses[mesAbrev];

        // Remove o ano e retorna a data no formato "dia mes"
        const dataFormatada = `${dia} ${mes}`;
        return dataFormatada;
    } else {
        return null;  // Retorna null caso não consiga converter
    }
}

function carregarPosts() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(posts => {
            const postsContainer = document.querySelector('.cl .fotos');
            postsContainer.innerHTML = '';  // Limpar posts antigos

            posts.forEach(post => {
                const postElement = document.createElement('div');
                postElement.classList.add('imagem');

                const dataPost = formatarData(post.data);  // Formatar a data
                
                // Verifica se a data foi formatada corretamente
                const dataFormatada = dataPost ? dataPost : 'Data inválida';

                postElement.innerHTML = `
                    <img src="${post.url}" alt="${post.titulo}" class="i">
                    <p class="v">${post.categoria}</p>
                    <p class="esp">${post.mensagem}</p>
                    <p class="esp">🗓️ ${dataFormatada} • ⏱︎ Editado há 20 minutos</p>
                `;

                postsContainer.appendChild(postElement);
            });

            MaximoPosts(posts);  // Atualiza os posts visíveis
        })
        .catch(error => {
            console.error('Erro:', error);
        });
}
