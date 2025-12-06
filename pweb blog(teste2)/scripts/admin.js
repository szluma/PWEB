const API_URL = "http://localhost:3000/usuarios";

// botão de criar postagem
const bt = document.getElementById("bt");
const modal = document.getElementById("modal-overlay");

bt.addEventListener("click", ()=> {
    modal.classList.add("active");
})

modal.addEventListener("click", (e)=> {
    if(e.target === modal){
        modal.classList.remove("active");
    }
})

async function CarregarPosts() {
    const resposta = await fetch(API_URL);
    const posts = await resposta.json();

    const container = document.querySelector(".imagens");
    container.innerHTML = ""; // limpa as publicações existentes

    posts.forEach(post => {
        const div = document.createElement("div");
        div.classList.add("imagem");
        div.dataset.id = post.id;

        div.innerHTML = `
            <img src="${post.url}" alt="" class="a">

            <h4><b>${post.titulo}</b></h4>

            <p class="esp">${post.mensagem}</p>
            <p class="esp">🗓️ ${post.data} • 👤 ${post.autor}</p>

            <div class="edit">
                <button class="opc">Editar 🖉</button>
                <button class="opc2">Excluir 🖉</button>
            </div>
        `;

        container.appendChild(div);
    });
    MaximoPosts();
}

// Envio do formulário
const form = document.getElementById("formulario");
if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const titulo = document.getElementById("tile").value.trim();
    const categoria = document.getElementById("categoria").value.trim();
    const url = document.getElementById("url").value.trim();
    const assunto = document.getElementById("assunto").value.trim();

    const novoPost = {
      titulo,
      mensagem: assunto,
      url,
      autor: nome,
      categoria,
      data: new Date().toLocaleDateString("pt-BR", { day: "2-digit", month: "short" })
    };

    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(novoPost)
    });

    modal.classList.remove("active");
    form.reset();
    CarregarPosts();
  });
}

CarregarPosts();

// botão de carregar mais posts
const botaoMais = document.getElementById("maisPosts");
let maximo = 6;

function MaximoPosts() {
    const posts = document.querySelectorAll(".imagens .imagem");

    posts.forEach((post, index) => {
        if (index < maximo) {
            post.style.display = "block";
        } else {
            post.style.display = "none";
        }
    });

    // se ainda tem posts escondidos → mostra o botão
    if (maximo < posts.length) {
        botaoMais.style.display = "block";
    } else {
        botaoMais.style.display = "none";
    }
}

botaoMais.addEventListener("click", () => {
    maximo += 6;  
    MaximoPosts();
});

MaximoPosts();


// botão de editar postagem
const edtmodal = document.getElementById("edtmodal-overlay");
const eform = document.getElementById("formEdt");
const enome = document.getElementById("nomedt");
const etitulo = document.getElementById("title");
const ecategoria = document.getElementById("categoriaedt");
const eurl = document.getElementById("urledt");
const emensagem = document.getElementById("edtassunto");

let editId = null;

document.addEventListener("click", (e) => {
    if (e.target.classList.contains("opc")) {

        const card = e.target.closest(".imagem");
        editId = card.dataset.id;

        edtmodal.classList.add("active");
    }
});

// fechar modal de edição
edtmodal.onclick = (e) => {
    if (e.target === edtmodal)
        edtmodal.classList.remove("active");
};

eform.onsubmit = async (e) => {
    e.preventDefault();

    const postAtualizado = {
        autor: enome.value || enome.placeholder,
        titulo: etitulo.value || etitulo.placeholder,
        categoria: ecategoria.value || ecategoria.placeholder,
        url: eurl.value || eurl.placeholder,
        mensagem: emensagem.value || emensagem.placeholder,
        data: new Date().toLocaleDateString("pt-BR", { day: "2-digit", month: "short" }),
        editadoEm: Date.now()
    };

    await fetch(`${API_URL}/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postAtualizado)
    });

    edtmodal.classList.remove("active");
    CarregarPosts();
};

// botão de excluir postagem
const exmodal = document.getElementById("modal-excluir");
const confirmarExcluir = document.getElementById("confirmar-excluir");
const cancelarExcluir = document.getElementById("cancelar-excluir");

let postIdExcluir = null;

document.addEventListener("click", (e) => {
    const botaoDelete = e.target.closest(".opc2"); 

    if (!botaoDelete) return; 

    const card = botaoDelete.closest(".imagem"); 

    postIdExcluir = card.dataset.id; 

    exmodal.classList.add("active");
});

// Confirmar exclusão
confirmarExcluir.addEventListener("click", async () => {
    await fetch(`${API_URL}/${postIdExcluir}`, {
        method: "DELETE"
    });

    exmodal.classList.remove("active");
    postIdExcluir = null;

    CarregarPosts();
});

// Cancelar exclusão
cancelarExcluir.addEventListener("click", () => {
    exmodal.classList.remove("active");
    postIdExcluir = null;
});