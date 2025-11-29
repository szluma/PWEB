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

// botão de editar postagem

const nomedt = document.getElementById("nomedt");
const title = document.getElementById("title");
const categoriaedt = document.getElementById("categoriaedt");
const urledt = document.getElementById("urledt");
const edtassunto = document.getElementById("edtassunto");

let currentPost = null;

edtmodaloverlay.addEventListener("click", (e)=> {
    if(e.target === edtmodaloverlay){
        edtmodaloverlay.classList.remove("active");
        currentPost = null;
    }
})

